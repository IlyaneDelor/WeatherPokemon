import React from "react"

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
    return (
        <div>
            {gotoPrevPage && <button onClick={gotoPrevPage}>&lt;&lt;Prev</button>}
            {gotoNextPage && <button onClick={gotoNextPage}>Next &gt;&gt;</button>}
        </div>
    )
}