import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const name = "Shivam";
        const username = "@shivam";
        const password = "bharatmatakijai"
        const uniqueId = "196906717b1";
        const DB = await pool.getConnection();
        const query = `UPDATE users SET name = ?, username = ?, password = ? WHERE unique_id = ?`;
        const result = await DB.execute(query, [name, username, password, uniqueId]);
    
        if (result){
            return NextResponse.json(
                {message : "User updated" },
                {status : 200 }
            )
        } else{
            return NextResponse.json(
                {message : "Updation Failed" },
                {status : 403 }
            )
        }   
    } catch (error) {
        return NextResponse.json(
            {message : error },
            {status : 500 }
        )
    }
}