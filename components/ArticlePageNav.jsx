// 'use client'
import Image from 'next/image';
import Link from 'next/link'

const ArticleNavPage = () => {
    return (
        <nav className="article-nav">
            <img 
                src="./assets/images/Pictures.jpg"
                alt="Profilepics"
                className="article-nav__img" 
            />
            <p className="article-nav__fullname">Full_name</p>
            <p className="article-nav__userid">userId</p>
            <Link
             href ='/articles/create'
             className="article-nav__btn btn"
            >
             create
            </Link>
            <Link
            href='/articles/personal'
            className="article-nav__btn btn">
                personal
            </Link>
            <Link
            href='/articles/inbox'
            className="article-nav__btn btn">
                inbox
            </Link>
        </nav>
    )
}

export default ArticleNavPage;