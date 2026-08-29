import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AdmZip from 'adm-zip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'office', 'assets');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

/* ============================================================
 * Helpers XML
 * ============================================================ */

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function run(text, { sz = 1800, b = false, color = '000000', font = 'Arial', i = false } = {}) {
  const iAttr = i ? ' i="1"' : '';
  return `<a:r><a:rPr lang="es-CL" altLang="en-US" sz="${sz}" b="${b ? 1 : 0}"${iAttr} dirty="0"><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="${font}"/><a:ea typeface="${font}"/><a:cs typeface="${font}"/></a:rPr><a:t>${esc(text)}</a:t></a:r>`;
}

function br() {
  return '<a:br/>';
}

function par(runsXml, { align, bullet = false, before = 0, after = 0, indent = 0 } = {}) {
  const al = align ? ` algn="${align}"` : '';
  const pPrEls =
    (before ? `<a:spcBef>` : '') +
    (before ? `<a:spcPts val="${before}"/>` : '') +
    (before ? `</a:spcBef>` : '') +
    (after ? `<a:spcAft><a:spcPts val="${after}"/></a:spcAft>` : '') +
    (bullet
      ? `<a:buFont typeface="Arial"/><a:buChar char="•"/>`
      : '<a:buNone/>');
  return `<a:p><a:pPr${al} marL="${indent}" indent="${bullet ? -342900 : indent}" lvl="0">${pPrEls}</a:pPr>${runsXml}<a:endParaRPr lang="es-CL" sz="1800"/></a:p>`;
}

// shapes -------------------------------------------------------

function rectShape(name, x, y, cx, cy, fill, { line = null, radius = 0, alpha = null } = {}) {
  const fillXml = alpha != null
    ? `<a:solidFill><a:srgbClr val="${fill}"><a:alpha val="${alpha}"/></a:srgbClr></a:solidFill>`
    : `<a:solidFill><a:srgbClr val="${fill}"/></a:solidFill>`;
  const ln = line
    ? `<a:ln w="12700" cap="flat"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln>`
    : '';
  const geom =
    radius > 0
      ? `<a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val ${radius}"/></a:avLst></a:prstGeom>`
      : '<a:prstGeom prst="rect"/>';
  return `<p:sp><p:nvSpPr><p:cNvPr id="${idSeq()}" name="${esc(name)}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>${geom}${fillXml}${ln}</p:spPr><p:txBody><a:bodyPr wrap="none" lIns="0" tIns="0" rIns="0" bIns="0"/><a:lstStyle/><a:p/></p:txBody></p:sp>`;
}

function textShape(name, x, y, cx, cy, paras, { anchor = 't', insets = '0,0,0,0' } = {}) {
  const pars = Array.isArray(paras) ? paras : [paras];
  return `<p:sp><p:nvSpPr><p:cNvPr id="${idSeq()}" name="${esc(name)}"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"/><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr wrap="square" anchor="${anchor}" lIns="0" tIns="0" rIns="0" bIns="0"/><a:lstStyle/>${pars.join('')}</p:txBody></p:sp>`;
}

let SEQ = 1;
function idSeq() {
  return SEQ++;
}

/* ============================================================
 * Constructor PPTX (16:9, EMU)
 * ============================================================ */

const SLIDE_W = 12192000;
const SLIDE_H = 6858000;

function pptxThemeXml(accent, accent2) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Templa">
  <a:themeElements>
    <a:clrScheme name="Templa">
      <a:dk1><a:srgbClr val="22222F"/></a:dk1>
      <a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="44546A"/></a:dk2>
      <a:lt2><a:srgbClr val="E7E6E6"/></a:lt2>
      <a:accent1><a:srgbClr val="${accent}"/></a:accent1>
      <a:accent2><a:srgbClr val="${accent2}"/></a:accent2>
      <a:accent3><a:srgbClr val="F59E0B"/></a:accent3>
      <a:accent4><a:srgbClr val="10B981"/></a:accent4>
      <a:accent5><a:srgbClr val="3B82F6"/></a:accent5>
      <a:accent6><a:srgbClr val="E11D48"/></a:accent6>
      <a:hlink><a:srgbClr val="0563C1"/></a:hlink>
      <a:folHlink><a:srgbClr val="954F72"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Templa">
      <a:majorFont><a:latin typeface="Arial"/><a:ea typeface="Arial"/><a:cs typeface="Arial"/></a:majorFont>
      <a:minorFont><a:latin typeface="Arial"/><a:ea typeface="Arial"/><a:cs typeface="Arial"/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Templa">
      <a:fillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="50000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill>
        <a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill>
      </a:fillStyleLst>
      <a:lnStyleLst>
        <a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
        <a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>
      </a:lnStyleLst>
      <a:effectStyleLst>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
      </a:effectStyleLst>
      <a:bgFillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
        <a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill>
        <a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="20000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="80000"/></a:schemeClr></a:gs></a:gsLst><a:path path="rect"><a:fillToRect l="50000" t="0" r="50000" b="100000"/></a:path></a:gradFill>
      </a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
  <a:objectDefaults/>
  <a:extraClrSchemeLst/>
</a:theme>`;
}

function pptxEmptyShapeTree() {
  return `<p:spTree>
  <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
  <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
</p:spTree>`;
}

function pptxSlideMasterXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>
    ${pptxEmptyShapeTree()}
  </p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
  <p:txStyles>
    <p:titleStyle><a:lvl1pPr algn="l" marL="0" indent="0" defTabSz="914400"><a:lnSpc><a:spcPct val="110000"/></a:lnSpc><a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="0"/></a:spcAft><a:buNone/><a:defRPr sz="4000" b="1" dirty="0"><a:solidFill><a:srgbClr val="22222F"/></a:solidFill><a:latin typeface="Arial"/></a:defRPr></a:lvl1pPr></p:titleStyle>
    <p:bodyStyle><a:lvl1pPr marL="342900" indent="-342900" defTabSz="914400"><a:lnSpc><a:spcPct val="115000"/></a:lnSpc><a:spcBef><a:spcPts val="600"/></a:spcBef><a:spcAft><a:spcPts val="600"/></a:spcAft><a:buFont typeface="Arial"/><a:buChar char="•"/><a:defRPr sz="1800" dirty="0"><a:solidFill><a:srgbClr val="22222F"/></a:solidFill><a:latin typeface="Arial"/></a:defRPr></a:lvl1pPr></p:bodyStyle>
    <p:otherStyle><a:defPPr/><a:lvl1pPr/><a:lvl2pPr/><a:lvl3pPr/><a:lvl4pPr/><a:lvl5pPr/><a:lvl6pPr/><a:lvl7pPr/><a:lvl8pPr/><a:lvl9pPr/></p:otherStyle>
  </p:txStyles>
</p:sldMaster>`;
}

function pptxSlideLayoutXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank">
    ${pptxEmptyShapeTree()}
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>`;
}

function pptxSlideXml(shapes) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr><a:grpSpLocks noGrp="1"/></p:cNvGrpSpPr><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${SLIDE_W}" cy="${SLIDE_H}"/><a:chOff x="0" y="0"/><a:chExt cx="${SLIDE_W}" cy="${SLIDE_H}"/></a:xfrm></p:grpSpPr>
      ${shapes.join('\n      ')}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
}

function pptxContentTypes(slideCount) {
  let slides = '';
  for (let i = 1; i <= slideCount; i++) {
    slides += `  <Override PartName="/ppt/slides/slide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>\n`;
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.theme+xml"/>
${slides}  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

const RELS_PKG = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

function pptxMasterRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>`;
}

function pptxLayoutRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>`;
}

function pptxSlideRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>`;
}

function pptxPresentationRels(slideCount) {
  let rels = '  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>\n';
  for (let i = 1; i <= slideCount; i++) {
    rels += `  <Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i}.xml"/>\n`;
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${rels}</Relationships>`;
}

function pptxPresentationXml(slideCount) {
  let slds = '';
  for (let i = 1; i <= slideCount; i++) {
    slds += `    <p:sldId id="${255 + i}" r:id="rId${i + 1}"/>\n`;
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>
${slds}  </p:sldIdLst>
  <p:sldSz cx="${SLIDE_W}" cy="${SLIDE_H}"/>
  <p:notesSz cx="6858000" cy="9144000"/>
  <p:defaultTextStyle><a:defPPr/></p:defaultTextStyle>
</p:presentation>`;
}

function pptxCore(title) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${esc(title)}</dc:title>
  <dc:creator>Templa</dc:creator>
  <cp:lastModifiedBy>Templa</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:modified>
</cp:coreProperties>`;
}

function pptxApp(slides, title) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Templa Office Builder</Application>
  <PresentationFormat>Widescreen</PresentationFormat>
  <Slides>${slides}</Slides>
  <Notes>0</Notes>
  <HiddenSlides>0</HiddenSlides>
  <MMClips>0</MMClips>
</Properties>`;
}

/* ============================================================
 * Slides del deck
 * ============================================================ */

function buildSlides(t) {
  const A = t.accent; // color principal
  const A2 = t.accent2 || t.accent;
  const INK = t.ink || '22222F';
  const MUT = t.mut || '7A8194';
  const BG = t.bg || 'FFFFFF';
  const onA = t.onAccent || 'FFFFFF';
  const dark = t.dark || false;

  const padX = 914400; // 1"
  const contentY = 2000000;

  const base = [
    rectShape('Fondo', 0, 0, SLIDE_W, SLIDE_H, BG),
  ];

  function kicker(text) {
    return [
      rectShape('Kicker', padX, 914400 + 320000, 139700, 13970, A),
      textShape('Kicker-t', padX + 228600, 914400, 5000000, 400000, [
        par(run(text.toUpperCase(), { sz: 1200, b: true, color: A, font: 'Arial' }), { after: 0 }),
      ], { anchor: 'ctr' }),
    ];
  }

  function title(text, size = 4400) {
    return [
      textShape('Titulo', padX, 1400000, 10000000, 1000000, [
        par(run(text, { sz: size, b: true, color: INK, font: 'Arial' }), { after: 0 }),
      ], { anchor: 'ctr' }),
    ];
  }

  function footer(n) {
    return [
      textShape('F-pie', padX, SLIDE_H - 570000, 4000000, 300000, [
        par(run('Templa · ' + t.name + '  |  ' + n, { sz: 1000, color: MUT }), { after: 0 }),
      ]),
    ];
  }

  // 1 — portada
  const s1 = [
    ...base,
    rectShape('Bloque marca', 0, 0, 182880, SLIDE_H, A),
    rectShape('Ficha', SLIDE_W - 2600000 - 120000, 1260000, 2600000, 4300000, A2, { alpha: 12000 }),
    rectShape('Ficha', SLIDE_W - 5000000 - 160000, 2300000, 5000000, 2600000, A, { alpha: 9000 }),
    textShape('Kicker-portada', padX, 2250000, 9000000, 400000, [
      par(run(t.cap.toUpperCase(), { sz: 1300, b: true, color: A, font: 'Arial' }), { after: 0 }),
    ], { anchor: 'ctr' }),
    textShape('Titulo-portada', padX, 2750000, 9400000, 1300000, [
      par(run(t.hero, { sz: 5200, b: true, color: INK, font: 'Arial' }), { after: 0 }),
    ], { anchor: 'ctr' }),
    textShape('Sub-portada', padX, 4200000, 9000000, 600000, [
      par(run(t.tag, { sz: 2100, color: MUT }), { after: 0 }),
    ], { anchor: 'ctr' }),
    textShape('Autor', padX, 5450000, 8000000, 400000, [
      par(run('Presentado por __tu_nombre__', { sz: 1400, color: MUT }), { after: 0 }),
    ], { anchor: 'ctr' }),
    footer('1'),
  ];

  // 2 — agenda
  const items = t.agenda;
  const s2 = [
    ...base,
    ...kicker('Agenda'),
    ...title('Temas a cubrir'),
    textShape('Agenda-wrap', padX, 2800000, 10400000, 2400000, [
      ...items.map((it, idx) =>
        par(
          run(`0${idx + 1}  `, { sz: 2000, b: true, color: A }) +
            run(it, { sz: 2000, color: INK }),
          { after: 1600, before: 0 },
        ),
      ),
    ]),
    footer('2'),
  ];

  // 3 — divisor de sección
  const s3 = [
    ...base,
    rectShape('Barra divisor', 0, SLIDE_H - 1524000, SLIDE_W, 1524000, INK),
    rectShape('Bloque marca', 0, 0, 182880, SLIDE_H, A),
    textShape('Num-seccion', padX, 1800000, 4600000, 2400000, [
      par(run(t.sectionNum, { sz: 9000, b: true, color: A }), { after: 0 }),
    ], { anchor: 'ctr' }),
    textShape('Tit-seccion', padX + 400000, 4200000, 9000000, 1100000, [
      par(run(t.sectionTitle, { sz: 4400, b: true, color: INK, font: 'Arial' }), { after: 0 }),
    ], { anchor: 'ctr' }),
    textShape('Sub-seccion', padX + 400000, 5350000, 8000000, 500000, [
      par(run(t.sectionSub, { sz: 1800, color: MUT }), { after: 0 }),
    ], { anchor: 'ctr' }),
    footer('3'),
  ];

  // 4 — contenido con bullets
  const s4 = [
    ...base,
    ...kicker(t.bulletsKicker),
    ...title(t.bulletsTitle),
    rectShape('Tarjeta', padX, 2900000, 10400000, 2900000, A, { alpha: 6000, radius: 4000 }),
    textShape('Bullets', padX + 1100000, 3150000, 8800000, 2500000, [
      ...t.bullets.map((b) =>
        par(run(b, { sz: 1900, color: INK }), { bullet: true, after: 1000, before: 1000 }),
      ),
    ]),
    footer('4'),
  ];

  // 5 — dos columnas
  const s5 = [
    ...base,
    ...kicker(t.twoColKicker),
    ...title(t.twoColTitle, 3600),
    rectShape('Col A', padX, 3000000, 4950000, 2500000, A, { alpha: 5000, radius: 6000 }),
    rectShape('Col B', padX + 5450000, 3000000, 4950000, 2500000, A2, { alpha: 5000, radius: 6000 }),
    textShape('Cabeza A', padX + 400000, 3220000, 4200000, 500000, [
      par(run(t.colAHead, { sz: 2300, b: true, color: INK }), { after: 0 }),
    ], { anchor: 'l' }),
    textShape('Cuerpo A', padX + 400000, 3750000, 4200000, 1600000, [
      par(run(t.colABody, { sz: 1600, color: MUT }), { lineSPct: null, after: 300 }),
      par(run('→ Sigue', { sz: 1500, b: true, color: A }), { after: 0, before: 400 }),
    ]),
    textShape('Cabeza B', padX + 5850000, 3220000, 4200000, 500000, [
      par(run(t.colBHead, { sz: 2300, b: true, color: INK }), { after: 0 }),
    ], { anchor: 'l' }),
    textShape('Cuerpo B', padX + 5850000, 3750000, 4200000, 1600000, [
      par(run(t.colBBody, { sz: 1600, color: MUT }), { after: 300 }),
      par(run('→ Descubre', { sz: 1500, b: true, color: A }), { after: 0, before: 400 }),
    ]),
    footer('5'),
  ];

  // 6 — números / stats
  const stats = t.stats;
  const s6 = [
    ...base,
    ...kicker(t.statsKicker),
    ...title(t.statsTitle),
    ...stats.map((st, i) => {
      const x = padX + i * 2771000;
      return [
        rectShape('Stat', x, 3100000, 2350000, 1900000, i % 2 === 0 ? A : A2, { radius: 7000 }),
        textShape('Stat-n', x, 3380000, 2350000, 850000, [
          par(run(st[0], { sz: 4200, b: true, color: onA, font: 'Arial' }), { algn: 'ctr', after: 0 }),
        ], { anchor: 'ctr' }),
        textShape('Stat-t', x, 4320000, 2350000, 600000, [
          par(run(st[1], { sz: 1300, b: true, color: onA }), { algn: 'ctr', after: 0 }),
        ], { anchor: 'ctr' }),
      ];
    }).flat(),
    footer('6'),
  ];

  // 7 — cita
  const s7 = [
    ...base,
    rectShape('Comilla', padX, 1900000, 1000000, 700000, A, { radius: 0 }),
    textShape('Quote', padX + 200000, 2850000, 9600000, 1900000, [
      par(run(t.quote, { sz: 3000, i: true, color: INK, font: 'Arial' }), { after: 500 }),
      par(run('— ' + t.quoteBy, { sz: 1800, b: true, color: A }), { before: 600 }),
    ]),
    footer('7'),
  ];

  // 8 — cierre
  const s8 = [
    ...base,
    rectShape('Bloque marca', 0, 0, 182880, SLIDE_H, A),
    rectShape('Glow', SLIDE_W - 3200000, -1100000, 4000000, 4000000, A, { alpha: 14000 }),
    textShape('Cierre', padX, 2700000, 9400000, 1000000, [
      par(run(t.thanks, { sz: 5200, b: true, color: INK }), { after: 0 }),
    ], { anchor: 'ctr' }),
    textShape('Cierre-sub', padX, 3850000, 9000000, 500000, [
      par(run(t.thanksSub, { sz: 2000, color: MUT }), { after: 0 }),
    ], { anchor: 'ctr' }),
    rectShape('Btn', padX, 4700000, 2800000, 800000, A, { radius: 16000 }),
    textShape('Btn-t', padX, 4700000, 2800000, 800000, [
      par(run(t.thanksCta, { sz: 1700, b: true, color: onA, font: 'Arial' }), { algn: 'ctr', after: 0 }),
    ], { anchor: 'ctr' }),
    footer('8'),
  ];

  // nota sobre s1..s8: dark decks usan INK acorde; usar t.ink ya configurado.
  return [s1, s2, s3, s4, s5, s6, s7, s8];
}

/* ============================================================
 * Constructor DOCX
 * ============================================================ */

const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const NS_DOC = {
  'xmlns:w': W,
  'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
};

function wPPr(opts = {}) {
  const {
    size = 22,
    bold = false,
    color = '22222F',
    align = 'left',
    spacing = '120',
    after = '200',
    before = '0',
    italic = false,
    font = 'Calibri',
    line = '276',
    keepNext = false,
  } = opts;
  const jc = align === 'left' ? '' : `<w:jc w:val="${align}"/>`;
  const kn = keepNext ? '<w:keepNext/>' : '';
  return `<w:pPr>${kn}<w:spacing w:before="${before}" w:after="${after}" w:line="${line}" w:lineRule="auto"/><w:rPr><w:rFonts w:ascii="${font}" w:hAnsi="${font}" w:eastAsia="${font}" w:cs="${font}"/><w:b${bold ? '' : ' w:val="0"'}/><w:i${italic ? '' : ' w:val="0"'}/><w:color w:val="${color}"/><w:sz w:val="${size * 2}"/><w:szCs w:val="${size * 2}"/></w:rPr>${jc}</w:pPr>`;
}

function wRun(text, { size = 22, bold = false, color = '22222F', italic = false, font = 'Calibri' } = {}) {
  const t = esc(text);
  return `<w:r><w:rPr><w:rFonts w:ascii="${font}" w:hAnsi="${font}" w:eastAsia="${font}" w:cs="${font}"/><w:b${bold ? '' : ' w:val="0"'}/><w:i${italic ? '' : ' w:val="0"'}/><w:color w:val="${color}"/><w:sz w:val="${size * 2}"/><w:szCs w:val="${size * 2}"/></w:rPr><w:t xml:space="preserve">${t}</w:t></w:r>`;
}

function wP(runsXml, opts) {
  return `<w:p>${wPPr(opts)}${runsXml}</w:p>`;
}

function wTbl(rows, widths) {
  const grid = widths.map((wd) => `<w:gridCol w:w="${wd}"/>`).join('');
  const trs = rows
    .map(
      (cells, rIdx) =>
        `<w:tr>${cells
          .map(
            (c, cIdx) =>
              `<w:tc><w:tcPr><w:tcW w:w="${widths[cIdx]}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="${rIdx % 2 === 1 ? 'F2F4FA' : 'FFFFFF'}"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:spacing w:before="0" w:after="40" w:line="240" w:lineRule="auto"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>${c}</w:p></w:tc>`,
          )
          .join('')}</w:tr>`,
    )
    .join('');
  return `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="${'DBE0EC'}"/><w:left w:val="single" w:sz="4" w:space="0" w:color="${'DBE0EC'}"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="${'DBE0EC'}"/><w:right w:val="single" w:sz="4" w:space="0" w:color="${'DBE0EC'}"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="${'DBE0EC'}"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="${'DBE0EC'}"/></w:tblBorders><w:look w:val="04A0"/></w:tblPr><w:tblGrid>${grid}</w:tblGrid>${trs}</w:tbl>`;
}

function buildDocXml(d) {
  const A = d.accent;
  const INK = d.ink || '22222F';
  const MUT = d.mut || '6B7280';
  // encabezado con kicker + título + línea de color
  const head = [
    wP(wRun(d.typeName.toUpperCase(), { size: 18, bold: true, color: A }), { after: 120, before: 0, spacing: '120' }),
    wP(wRun(d.name, { size: 44, bold: true, color: INK }), { after: 60, keepNext: true }),
    wP(wRun(d.tagline + '  ·  ' + d.meta), { size: 22, color: MUT, after: 240 }),
  ];
  const body = d.body.map((sec) => {
    const parts = [
      wP(wRun(sec.t, { size: 28, bold: true, color: A }), { after: 180, before: 240, keepNext: true }),
    ];
    for (const item of sec.items) {
      if (item.kind === 'text') {
        parts.push(wP(wRun(item.v), { after: 160 }));
      } else if (item.kind === 'bullet') {
        parts.push(
          `<w:p><w:pPr><w:spacing w:before="40" w:after="100" w:line="276" w:lineRule="auto"/><w:ind w:left="285" w:hanging="285"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:color w:val="${A}"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>•  </w:t></w:r>${wRun(item.v)}</w:p>`,
        );
      } else if (item.kind === 'table') {
        const headRow = item.head.map((h) => wRun(h, { bold: true, color: A, size: 20 }));
        const bodyRows = item.rows.map((r) => r.map((c) => wRun(c, { size: 20 })));
        parts.push(
          wTbl(
            [headRow, ...bodyRows],
            item.widths,
          ),
        );
        // spacer
        parts.push(wP(wRun(''), { after: 120, size: 18 }));
      }
    }
    return parts.join('');
  });

  const foot = wP(
    wRun('Generado con Templa — plantilla de ' + d.format + ' · licencia gratuita', { size: 16, color: MUT }),
    { align: 'center', before: 480, after: 0 },
  );

  const sectPr = `<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr>`;

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="${W}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${head.join('\n    ')}
    ${body.join('\n    ')}
    ${foot}
    ${sectPr}
  </w:body>
</w:document>`;
}

function docxContentTypes() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function docxRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function docxDocumentRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>
</Relationships>`;
}

function docxStyles() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="${W}">
  <w:docDefaults>
    <w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="es-CL" w:eastAsia="en-US" w:bidi="ar-SA"/></w:rPr></w:rPrDefault>
    <w:pPrDefault><w:pPr><w:spacing w:after="200" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="120"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr></w:style>
  <w:style w:type="table" w:default="1" w:styleId="TableGrid"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="40" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
</w:styles>`;
}

const docxSettings = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="${W}">
  <w:zoom w:percent="100"/>
  <w:defaultTabStop w:val="708"/>
  <w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat>
</w:settings>`;

const docxFontTable = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:fonts xmlns:w="${W}">
  <w:font w:name="Calibri"><w:panose1 w:val="020F0502020204030204"/><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/></w:font>
  <w:font w:name="Arial"><w:panose1 w:val="020B0604020202020204"/><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/></w:font>
</w:fonts>`;

function docxApp(pages) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Templa Office Builder</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <Company>Templa</Company>
  <Pages>${pages}</Pages>
  <Words>0</Words>
  <Characters>0</Characters>
  <Lines>0</Lines>
  <Paragraphs>0</Paragraphs>
  <Template>Normal.dotm</Template>
  <TotalTime>0</TotalTime>
  <PresentationFormat>Letter</PresentationFormat>
</Properties>`;
}

/* ============================================================
 * Contenido de los templates
 * ============================================================ */

const DECKS = [
  {
    id: 'deck-minimal',
    name: 'Linear Deck',
    kind: 'pptx',
    accent: '0EA5E9',
    accent2: '38BDF8',
    ink: '13151C',
    mut: '6B7280',
    bg: 'FFFFFF',
    cap: 'Presentación · Minimal',
    hero: 'Ideas claras, diseño limpio',
    tag: 'Deck tipográfico para cualquier presentación profesional',
    agenda: ['Introducción y contexto', 'Objetivos del proyecto', 'Metodología', 'Resultados clave', 'Próximos pasos'],
    sectionNum: '01',
    sectionTitle: 'Introducción',
    sectionSub: 'El punto de partida de la historia',
    bulletsKicker: 'Contenido',
    bulletsTitle: 'Puntos a desarrollar',
    bullets: [
      'Define el mensaje central en una sola frase',
      'Usa datos para respaldar cada afirmación',
      'Mantén una diapositiva por idea principal',
      'Cierra cada bloque con una conclusión accionable',
    ],
    twoColKicker: 'Comparativa',
    twoColTitle: 'Antes vs. después',
    colAHead: 'Antes',
    colABody: 'Mensajes dispersos, plantillas genéricas y poca jerarquía visual que resta credibilidad.',
    colBHead: 'Después',
    colBBody: 'Narrativa ordenada, marca consistente y una presentación que se recuerda.',
    statsKicker: 'Resultados',
    statsTitle: 'Impacto en números',
    stats: [
      ['+92%', 'Claridad'],
      ['3.2x', 'Retención'],
      ['−65%', 'Tiempo de armado'],
      ['4.9★', 'Feedback'],
    ],
    quote: 'El diseño no es cómo se ve y siente. El diseño es cómo funciona.',
    quoteBy: 'Steve Jobs',
    thanks: 'Gracias',
    thanksSub: 'Preguntas y comentarios — hablemos de tu proyecto',
    thanksCta: 'Conversar →',
  },
  {
    id: 'deck-pitch',
    name: 'Pitch Grid',
    kind: 'pptx',
    accent: '6366F1',
    accent2: '818CF8',
    ink: 'F5F6FF',
    mut: 'A8AFC9',
    bg: '0B1023',
    dark: true,
    cap: 'Pitch deck · Startup',
    hero: 'De la idea a la inversión',
    tag: '11 diapositivas que convencen a inversores en menos de 5 minutos',
    agenda: ['Problema', 'Solución', 'Mercado', 'Modelo de negocio', 'Equipo'],
    sectionNum: '01',
    sectionTitle: 'El problema',
    sectionSub: 'Qué duele hoy y por qué importa',
    bulletsKicker: 'Solución',
    bulletsTitle: 'Lo que construimos',
    bullets: [
      'El problema afirmado en una sola línea memorable',
      'La solución explicada con una demo concreta',
      'TAM / SAM / SOM para dimensionar la oportunidad',
      'Métricas traccionables desde el mes uno',
    ],
    twoColKicker: 'Mercado',
    twoColTitle: 'Oportunidad',
    colAHead: 'Sobrecostos',
    colABody: 'Los clientes pagan por procesos manuales, lentos y sin trazabilidad.',
    colBHead: 'Automatización',
    colBBody: 'Una plataforma que reduce el tiempo de proceso en más de un 60%.',
    statsKicker: 'Tracción',
    statsTitle: 'Las cifras que importan',
    stats: [
      ['$120M', 'Mercado'],
      ['38%', 'Margen'],
      ['2.1M', 'Usuarios'],
      ['9×', 'Retorno'],
    ],
    quote: 'Los mejores pitch decks cuentan una historia simple con números que la respaldan.',
    quoteBy: 'Y Combinator',
    thanks: 'Gracias',
    thanksSub: 'Inversión inicial USD 500K — reserva tu slot',
    thanksCta: 'Agendar call →',
  },
  {
    id: 'deck-corporate',
    name: 'Boardroom',
    kind: 'pptx',
    accent: '1F6FEB',
    accent2: '60A5FA',
    ink: '15181F',
    mut: '64748B',
    bg: 'FFFFFF',
    cap: 'Presentación · Corporativa',
    hero: 'Reporte trimestral de resultados',
    tag: 'Formato ejecutivo para boards, comités y clientes corporativos',
    agenda: ['Resumen ejecutivo', 'Resultados financieros', 'Clientes y mercado', 'Riesgos', 'Plan Q+1'],
    sectionNum: '03',
    sectionTitle: 'Resultados',
    sectionSub: 'Giro, margen y crecimiento en el trimestre',
    bulletsKicker: 'Resumen',
    bulletsTitle: 'Lo esencial',
    bullets: [
      'Crecimiento de ingresos del 18% vs. el trimestre anterior',
      'Margen bruto estable en 62% pese a mayor inversión',
      'Churn mensual reducido a 1.2%, récord histórico',
      'Tres lanzamientos clave ejecutados sin riesgo crítico',
    ],
    twoColKicker: 'Clientes',
    twoColTitle: 'Mercado',
    colAHead: 'Retención',
    colABody: 'NPS de 68 y renovaciones anticipadas en el 41% de la cartera.',
    colBHead: 'Expansión',
    colBBody: 'Dos cuentas enterprise nuevas y 14 upsells cerrados en el período.',
    statsKicker: 'Financiero',
    statsTitle: 'Indicadores clave',
    stats: [
      ['+18%', 'Ingresos'],
      ['62%', 'Margen'],
      ['1.2%', 'Churn'],
      ['68', 'NPS'],
    ],
    quote: 'La confianza se construye con métricas consistentes trimestre a trimestre.',
    quoteBy: 'Comité directivo',
    thanks: 'Gracias',
    thanksSub: 'Detalle completo disponible en el anexo financiero',
    thanksCta: 'Ver anexo →',
  },
  {
    id: 'deck-academic',
    name: 'Seminario',
    kind: 'pptx',
    accent: '0F766E',
    accent2: '2DD4BF',
    ink: '1C2B2A',
    mut: '5B6B6A',
    bg: 'F8FAF9',
    cap: 'Presentación · Académica',
    hero: 'Título tentativo de investigación',
    tag: 'Estructura para tesis, seminarios y defensas frente a comités',
    agenda: ['Planteamiento del problema', 'Marco teórico', 'Metodología', 'Hallazgos', 'Conclusiones'],
    sectionNum: '02',
    sectionTitle: 'Marco teórico',
    sectionSub: 'Estado del arte y preguntas de investigación',
    bulletsKicker: 'Metodología',
    bulletsTitle: 'Cómo se investigó',
    bullets: [
      'Enfoque mixto con revisión sistemática de literatura',
      'Muestra de 240 participantes y 12 entrevistas a profundidad',
      'Análisis temático con triangulación de fuentes',
      'Rigor garantizado por pares revisores del comité',
    ],
    twoColKicker: 'Hallazgos',
    twoColTitle: 'Discusión',
    colAHead: 'Dato central',
    colABody: 'El 87% de los casos presentó correlación significativa (p < 0.05).',
    colBHead: 'Límite',
    colBBody: 'El alcance geográfico invita a replicar el estudio en otros contextos.',
    statsKicker: 'Resultados',
    statsTitle: 'Datos del estudio',
    stats: [
      ['87%', 'Correlación'],
      ['240', 'Muestra'],
      ['12', 'Entrevistas'],
      ['p<.05', 'Sig.'],
    ],
    quote: 'Una investigación bien planteada resuelve una pregunta que merece ser respondida.',
    quoteBy: 'Comité evaluador',
    thanks: 'Gracias por su atención',
    thanksSub: 'Se reciben preguntas y retroalimentación del comité',
    thanksCta: 'Abrir debate →',
  },
];

const DOCS = [
  {
    id: 'doc-cv',
    name: 'Resume Pro',
    kind: 'docx',
    accent: 'DB2777',
    ink: '1F2433',
    mut: '6B7280',
    format: 'CV',
    typeName: 'Hoja de vida',
    name: 'Tu Nombre Profesional',
    tagline: 'Resumen ejecutivo: PM con 6+ años liderando productos digitales.',
    meta: 'email@tudominio.cl · +56 9 0000 0000 · ciudad, país',
    body: [
      {
        t: 'Experiencia profesional',
        items: [
          { kind: 'text', v: 'Lead Product Manager — Empresa XYZ, 2022–hoy. Lideré el roadmap de 3 líneas de producto, +32% de retención y equipos de 10 personas.' },
          { kind: 'bullet', v: 'Definición de visión, KPIs y OKRs alineados a negocio' },
          { kind: 'bullet', v: 'Lanzamiento de 4 features core con 4.8★ de satisfacción' },
          { kind: 'bullet', v: 'Negociación con stakeholders técnicos y comerciales' },
        ],
      },
      {
        t: 'Educación',
        items: [
          { kind: 'text', v: 'Ingeniería Civil en Informática — Universidad de Concepción, 2019.' },
          { kind: 'bullet', v: 'Diplomado en Product Management (Product School)' },
        ],
      },
      {
        t: 'Habilidades',
        items: [
          { kind: 'table', head: ['Área', 'Herramientas', 'Nivel'], rows: [['Producto', 'Jira, Roadmunk, Figma', 'Avanzado'], ['Datos', 'SQL, Amplitude', 'Intermedio'], ['Liderazgo', 'Scrum, OKRs', 'Avanzado']], widths: [1800, 3600, 1800] },
        ],
      },
    ],
  },
  {
    id: 'doc-report',
    name: 'Informe Anual',
    kind: 'docx',
    accent: '0B3B8C',
    ink: '15181F',
    mut: '64748B',
    format: 'Informe',
    typeName: 'Documento corporativo',
    name: 'Informe de Gestión 2026',
    tagline: 'Reporte ejecutivo de resultados, impacto y proyecciones.',
    meta: 'Departamento de Operaciones · Trimestre 3',
    body: [
      {
        t: '1. Resumen ejecutivo',
        items: [
          { kind: 'text', v: 'Durante el trimestre la organización creció 18% en ingresos recurrentes, mantuvo su margen en 62% y redujo el churn a 1.2%, consolidando tres trimestres consecutivos de mejora operativa.' },
          { kind: 'bullet', v: 'Ingresos: $1.2M ARR, +18% vs trimestre anterior' },
          { kind: 'bullet', v: 'Satisfacción: NPS 68, récord histórico' },
        ],
      },
      {
        t: '2. Dimensiones de seguimiento',
        items: [
          { kind: 'table', head: ['Dimensión', 'Meta', 'Real', 'Var.'], rows: [['Ingresos', '$1.1M', '$1.2M', '+9%'], ['Churn', '1.5%', '1.2%', '−20%'], ['NPS', '60', '68', '+8pts']], widths: [2400, 1800, 1800, 1800] },
        ],
      },
      {
        t: '3. Conclusiones',
        items: [
          { kind: 'text', v: 'Se recomienda redoblar la inversión en retención de cuentas enterprise y preparar la escalabilidad comercial para el próximo ciclo.' },
        ],
      },
    ],
  },
  {
    id: 'doc-proposal',
    name: 'Propuesta Comercial',
    kind: 'docx',
    accent: '7C3AED',
    ink: '1C1A2E',
    mut: '6B7280',
    format: 'Propuesta',
    typeName: 'Documento comercial',
    name: 'Propuesta de Servicios',
    tagline: 'Alcance, entregables, inversión y condiciones.',
    meta: 'Preparada por Nombre Comercial · Cliente: Empresa',
    body: [
      {
        t: '1. Entendimiento del desafío',
        items: [
          { kind: 'text', v: 'Tras las reuniones de levantamiento, identificamos tres focos: tiempo al mercado, consistencia de marca y automatización de reportes.' },
        ],
      },
      {
        t: '2. Alcance y entregables',
        items: [
          { kind: 'bullet', v: 'Fase 1 — Diagnóstico y rediseño del flujo core (4 semanas)' },
          { kind: 'bullet', v: 'Fase 2 — Implementación y QA (6 semanas)' },
          { kind: 'bullet', v: 'Fase 3 — Capacitación y garantía (2 semanas)' },
        ],
      },
      {
        t: '3. Inversión',
        items: [
          { kind: 'table', head: ['Ítem', 'Detalle', 'Valor'], rows: [['Fase 1', 'Diagnóstico + diseño', '$4.500.000'], ['Fase 2', 'Implementación', '$9.500.000'], ['Fase 3', 'Capacitación', '$2.000.000'], ['Total', 'Pago en 2 cuotas', '$16.000.000']], widths: [1800, 3600, 1800] },
        ],
      },
      {
        t: '4. Condiciones comerciales',
        items: [
          { kind: 'bullet', v: '50% de anticipo y saldo contra entrega' },
          { kind: 'bullet', v: 'Garantía de 90 días sobre los entregables' },
        ],
      },
    ],
  },
  {
    id: 'doc-thesis',
    name: 'Tesis Norte',
    kind: 'docx',
    accent: '0F766E',
    ink: '172321',
    mut: '5B6B6A',
    format: 'Tesis',
    typeName: 'Documento académico',
    name: 'Título de la Investigación',
    tagline: 'Trabajo de grado presentado como requisito. Estructura APA actualizada.',
    meta: 'Autor: Estudiante · Facultad de Ciencias Sociales',
    body: [
      {
        t: 'Resumen',
        items: [
          { kind: 'text', v: 'La presente investigación aborda el fenómeno descrito mediante un enfoque mixto, con una muestra de 240 participantes y análisis temático triangulado.' },
        ],
      },
      {
        t: '1. Planteamiento del problema',
        items: [
          { kind: 'text', v: 'Se observa una brecha entre la práctica actual y el estado del arte. Esta investigación busca responder: ¿qué factores explican el resultado observado?' },
        ],
      },
      {
        t: '2. Metodología',
        items: [
          { kind: 'bullet', v: 'Diseño: secuencial explicativo, dos fases' },
          { kind: 'bullet', v: 'Instrumentos: encuesta validada (α = 0.89) y entrevistas semiestructuradas' },
        ],
      },
      {
        t: '3. Resultados y discusión',
        items: [
          { kind: 'table', head: ['Hipótesis', 'Correlación', 'Decisión'], rows: [['H1 — Factor edad', 'r = 0.42**', 'Aceptada'], ['H2 — Factor contexto', 'r = 0.31**', 'Aceptada'], ['H3 — Factor formación', 'r = 0.12', 'Rechazada']], widths: [3000, 2400, 1800] },
        ],
      },
    ],
  },
];

/* ============================================================
 * Empaquetar
 * ============================================================ */

function buildPptx(t) {
  const slides = buildSlides(t).map((shapes) => pptxSlideXml(shapes));
  const n = slides.length;
  const zip = new AdmZip();
  zip.addFile('[Content_Types].xml', Buffer.from(pptxContentTypes(n), 'utf8'));
  zip.addFile('_rels/.rels', Buffer.from(RELS_PKG, 'utf8'));
  zip.addFile('docProps/core.xml', Buffer.from(pptxCore(t.name + ' · ' + t.tagline), 'utf8'));
  zip.addFile('docProps/app.xml', Buffer.from(pptxApp(n, t.name), 'utf8'));
  zip.addFile('ppt/presentation.xml', Buffer.from(pptxPresentationXml(n), 'utf8'));
  zip.addFile('ppt/_rels/presentation.xml.rels', Buffer.from(pptxPresentationRels(n), 'utf8'));
  zip.addFile('ppt/theme/theme1.xml', Buffer.from(pptxThemeXml(t.accent, t.accent2), 'utf8'));
  zip.addFile('ppt/slideMasters/slideMaster1.xml', Buffer.from(pptxSlideMasterXml(), 'utf8'));
  zip.addFile('ppt/slideMasters/_rels/slideMaster1.xml.rels', Buffer.from(pptxMasterRels(), 'utf8'));
  zip.addFile('ppt/slideLayouts/slideLayout1.xml', Buffer.from(pptxSlideLayoutXml(), 'utf8'));
  zip.addFile('ppt/slideLayouts/_rels/slideLayout1.xml.rels', Buffer.from(pptxLayoutRels(), 'utf8'));
  slides.forEach((slide, i) => {
    const num = i + 1;
    zip.addFile(`ppt/slides/slide${num}.xml`, Buffer.from(slide, 'utf8'));
    zip.addFile(`ppt/slides/_rels/slide${num}.xml.rels`, Buffer.from(pptxSlideRels(), 'utf8'));
  });
  zip.writeZip(path.join(OUT_DIR, `${t.id}.pptx`));
}

function buildDocx(d) {
  const zip = new AdmZip();
  zip.addFile('[Content_Types].xml', Buffer.from(docxContentTypes(), 'utf8'));
  zip.addFile('_rels/.rels', Buffer.from(docxRels(), 'utf8'));
  zip.addFile('docProps/core.xml', Buffer.from(pptxCore(d.name), 'utf8'));
  zip.addFile('docProps/app.xml', Buffer.from(docxApp(3), 'utf8'));
  zip.addFile('word/document.xml', Buffer.from(buildDocXml(d), 'utf8'));
  zip.addFile('word/_rels/document.xml.rels', Buffer.from(docxDocumentRels(), 'utf8'));
  zip.addFile('word/styles.xml', Buffer.from(docxStyles(), 'utf8'));
  zip.addFile('word/settings.xml', Buffer.from(docxSettings, 'utf8'));
  zip.addFile('word/fontTable.xml', Buffer.from(docxFontTable, 'utf8'));
  zip.writeZip(path.join(OUT_DIR, `${d.id}.docx`));
}

for (const d of DECKS) buildPptx(d);
for (const d of DOCS) buildDocx(d);

console.log('Office templates generados:');
for (const d of [...DECKS, ...DOCS]) {
  const file = `${d.id}.${d.kind}`;
  const size = fs.statSync(path.join(OUT_DIR, file)).size;
  console.log(`  ${file.padEnd(22)} ${(size / 1024).toFixed(1)} KB`);
}