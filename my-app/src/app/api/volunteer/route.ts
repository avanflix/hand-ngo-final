import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const sheets = google.sheets({
    version: 'v4',
    auth
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {
            name,
            email,
            phone,
            city,
            skills,
            availability,
            message
        } = body

        if (
            !name ||
            !email ||
            !phone ||
            !city ||
            !skills ||
            !availability ||
            !message
        ) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A:H',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[
                    name,
                    email,
                    phone,
                    city,
                    skills,
                    availability,
                    message,
                    new Date().toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata'
                    })
                ]]
            }
        })

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_APP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Volunteer Application',
            html: `
            <h2>New Volunteer Application</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Availability:</strong> ${availability}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
        })

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully'
        })
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}