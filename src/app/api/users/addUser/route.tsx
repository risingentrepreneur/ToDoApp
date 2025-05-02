import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const uniqueId = Date.now().toString(16);
        const DB = await pool.getConnection();
        const query = `INSERT INTO users (name, username, password, unique_id) VALUES (?, ?, ?, ?)`;
        const result = await DB.execute(query, ["ishika", "@ishika", "abcd", uniqueId]);
    
        if (result){
            return NextResponse.json(
                {message : "Data entered" },
                {status : 200 }
            )
        } else{
            return NextResponse.json(
                {message : "Data Failed" },
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