## --> [ _Overview_ ]

Telegram Authentication With User Telegram Id Made Using Nextjs,Typescript,Next-auth And Supabase Database By Raizel And Unique.

## --> [ _Demo_ ]

[Click To Check](https://telegram-login-next-js.vercel.app/)

## --> [ _App_Overview_ ]

- Make Sure User Subscribed To Your Telegram Bot.
- User Enter His TelegramId In Login Page. Then Click On Generate Now.
- A UniqueId Will Be Sent To User Using Your Bot.
- User Enter UniqueId To Log In.

## --> [ _Supabase_Setup_ ]

- Signup On Supabase And Create Tables As Followed Below.

```
CREATE TABLE Users {
    id INT UNIQUE NOT NULL,
    fullName VARCHAR (50) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    telegramId INT UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
}
```

```
CREATE TABLE UserSession {
    id INT UNIQUE NOT NULL,
    telegramId INT UNIQUE NOT NULL,
    encryptedToken VARCHAR(max) NOT NULL,
    createdOn VARCHAR(max) NOT NULL
}
```

## --> [ _Environment_Variables_Needed_ ]

```
NEXT_PUBLIC_TELEGRAM_BOT_KEY=<YOUR_TELEGRAM_BOT_TOKEN>
NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
NEXT_PUBLIC_JWT_SECRET=<32_CHARACTER_SUPER_SECRET_PASSWORD>
NEXTAUTH_URL=<YOUR_WEBSITE_URL>
```

## Getting Started

```bash
/* Install Dependency */
npm install

/* Run Development Server */
npm run dev
# or
yarn dev
```
