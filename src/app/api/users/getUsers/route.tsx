import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const DB = await pool.getConnection();
        const query = `SELECT name, username, unique_id FROM users`;
        const [rows] = await DB.execute(query);
    
        if (rows){
            return NextResponse.json( rows,
                {status : 200 }
            )
        } else{
            return NextResponse.json(
                {message : "Data Fetched Failed" },
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