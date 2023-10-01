import Link from "next/link"
import React from 'react'

export default function NotFound() {
    return (
        <div className="text-center">
            <p className="mt-10">Sorry, the requested Dept does not exist.</p>
            <Link href="/">Back to Home</Link>
        </div>
    )
}