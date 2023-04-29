import React from "react";

export default function Nav(){
    return(
        <div>
            <nav>
                <div>
                    <ul>
                        <li>
                            <a href="/">My Posts</a>
                        </li>
                        <li>
                            <a href="/posts">Add Posts</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}