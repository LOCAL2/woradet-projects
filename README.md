# Portfolio Website - Vercel Projects Showcase

เว็บไซต์แสดงผลงานที่ดึงข้อมูล projects ทั้งหมดจาก Vercel API มาแสดงผลแบบ real-time

## ✨ Features

- 🎨 Modern UI/UX ระดับโลก
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- 🖼️ Auto-generated project screenshots
- ⚡ Fast performance with Next.js 16
- 🔄 Auto-refresh every hour
- 🎭 Smooth animations

## 🚀 Setup

1. Clone repository นี้

2. ติดตั้ง dependencies:
```bash
npm install
# หรือ
bun install
```

3. สร้าง Vercel API Token:
   - ไปที่ https://vercel.com/account/tokens
   - สร้าง token ใหม่
   - Copy token

4. สร้างไฟล์ `.env.local` และใส่ token:
```env
VERCEL_TOKEN=your_vercel_token_here
VERCEL_TEAM_ID=your_team_id_here_optional
```

5. รัน development server:
```bash
npm run dev
# หรือ
bun dev
```

6. เปิดเบราว์เซอร์ที่ http://localhost:3000

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # หน้าหลัก
│   ├── layout.tsx        # Layout หลัก
│   └── globals.css       # Global styles
├── components/
│   ├── project-card.tsx  # Card แสดง project
│   └── theme-toggle.tsx  # ปุ่มสลับ theme
├── lib/
│   └── vercel.ts         # Vercel API functions
└── .env.local            # Environment variables
```

## 🎨 Customization

### เปลี่ยนสี theme:
แก้ไขใน `app/globals.css`

### เปลี่ยน layout:
แก้ไขใน `app/page.tsx`

### เพิ่ม features:
แก้ไขใน `components/` หรือสร้าง component ใหม่

## 🌐 Deploy

Deploy ง่ายๆ บน Vercel:

1. Push code ขึ้น GitHub
2. Import project ใน Vercel
3. เพิ่ม Environment Variables (`VERCEL_TOKEN`)
4. Deploy!

## 📝 Notes

- Screenshot ของ project จะถูก generate อัตโนมัติผ่าน Microlink API
- ข้อมูล project จะ refresh ทุก 1 ชั่วโมง
- รองรับทั้ง personal และ team projects

## 🛠️ Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel API

---

Made with ❤️ using Next.js
