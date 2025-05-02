import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const uniqueId = "xyz";
        const DB = await pool.getConnection();
        const query = `DELETE FROM users WHERE unique_id = ?`;
        const result = await DB.execute(query, [uniqueId]);
    
        if (result){
            return NextResponse.json(
                {message : "User deleted" },
                {status : 200 }
            )
        } else{
            return NextResponse.json(
                {message : "Deletion Failed" },
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