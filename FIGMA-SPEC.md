# สเปกสำหรับสร้างไฟล์ Figma

ไฟล์นี้เป็นแบบร่างให้ทำ Figma ตามได้เร็ว โดยตัวเลขทุกค่าตรงกับโค้ดจริง คนตรวจเทียบแล้วจะเห็นว่า design กับ code เป็นระบบเดียวกัน

## Local styles ที่ต้องสร้างก่อน

**Color styles**

| ชื่อสไตล์ | HEX |
|---|---|
| `bg/paper` | #EAEDEF |
| `bg/card` | #FFFFFF |
| `text/ink` | #131A21 |
| `text/muted` | #5C6B78 |
| `border/line` | #D6DCE1 |
| `brand/navy` | #123A5A |
| `brand/navy-deep` | #0C2840 |
| `status/queue-fg` · `bg` · `dot` | #3F5361 · #E6EBEF · #6B8296 |
| `status/progress-fg` · `bg` · `dot` | #0B5CAB · #E1EEFB · #1478D4 |
| `status/done-fg` · `bg` · `dot` | #106B4E · #E1F1EA · #17976D |
| `status/pay-fg` · `bg` · `dot` | #9A4A06 · #FCEEDC · #D4820F |

**Text styles** — IBM Plex Sans Thai / IBM Plex Mono

| ชื่อ | ขนาด | น้ำหนัก | Line height |
|---|---|---|---|
| `display` | 30 | 600 | 40 |
| `display/mobile` | 24 | 600 | 34 |
| `title` | 16 | 600 | 24 |
| `body` | 15 | 400 | 24 |
| `label` | 14 | 500 | 20 |
| `caption` | 13 | 400 | 20 |
| `code` | 15 | 500 | 22 (IBM Plex Mono) |
| `code/small` | 13 | 400 | 20 (IBM Plex Mono) |

**Effect style** `shadow/raise` = `0 1 2 rgba(19,26,33,.06)` + `0 8 24 -12 rgba(19,26,33,.18)`

Corner radius: การ์ดและกล่องใหญ่ 14 · ปุ่มและ input 8 · badge = pill · ปุ่มคัดลอก 6

## Components ที่ต้องทำ

1. **StatusBadge** — Auto Layout แนวนอน, padding 12/6, gap 8, จุดกลม 6px + ข้อความ `label`
   Variant `status` = queue / progress / done / pay, Variant `size` = sm / md
2. **CopyButton** — ไอคอน 14px + ข้อความ `caption`, Variant `state` = default / copied
3. **OrderCard** — แถบสี 4px ชิดขอบซ้าย + เนื้อหา padding 24/20
   Variant `expanded` = false / true, Variant `status` เชื่อมกับ StatusBadge
4. **Tabs** — Variant `selected` = true / false (เส้นใต้ 2px สี navy ตอน selected)
5. **StateBlock** — Variant `type` = loading / empty / not-found / invalid / server-error

## Frames ที่ต้องมี

**Desktop 1440 × 1024** — content กว้าง 896px จัดกึ่งกลาง, padding ซ้ายขวา 24
```
┌──────────────────────────────────────────┐
│ โลโก้                     ติดต่อฝ่ายบริการ │  header 64
├──────────────────────────────────────────┤
│ ▓▓ กล่องกรมเข้ม ▓▓                        │
│  หัวเรื่อง 30/600                          │
│  คำอธิบาย 15/400                           │
│  [ ช่องกรอก ─────────── ] [ ค้นหา ]        │  input 48 สูง, gap 10
│  helper text 13                            │
├──────────────────────────────────────────┤
│ ออเดอร์ปัจจุบัน │ ออเดอร์ที่ผ่านมา          │  tabs
├──────────────────────────────────────────┤
│ ▌ ORD-… [คัดลอก]            [ Badge ]     │  การ์ด gap 12
│ ▌ 21/08/2026 15:42 น.          ฿8,450     │
│ ▌ ชื่อสินค้า · ดูรายละเอียด ⌄               │
└──────────────────────────────────────────┘
```

**Desktop — การ์ดตอนกาง** รายละเอียดแบ่งสองคอลัมน์ `1fr / 200px` คอลัมน์ขวาเป็น timeline 5 ขั้น

**Mobile 390 × 844** — padding ซ้ายขวา 16, ทุกอย่างเรียงคอลัมน์เดียว
```
┌────────────────────┐
│ โลโก้        ติดต่อ │
├────────────────────┤
│ ▓ หัวเรื่อง 24/600  │
│ ▓ [ ช่องกรอก     ] │
│ ▓ [    ค้นหา     ] │  ปุ่มเต็มความกว้าง
│ ▓ helper text      │
├────────────────────┤
│ ปัจจุบัน │ ที่ผ่านมา │
├────────────────────┤
│ ▌ ORD-… [คัดลอก]   │
│ ▌ 21/08/2026 15:42 │
│ ▌ [ Badge ] ฿8,450 │
│ ▌ ดูรายละเอียด ⌄    │
└────────────────────┘
```

**หน้า State ทั้ง 5** วางเรียงกันในอีก 1 frame ให้คนตรวจเห็นครบในหน้าเดียว: loading skeleton, empty (สองแท็บ), not found, format ผิด, server error
