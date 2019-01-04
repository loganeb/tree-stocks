import Link from 'next/link';

export default () => {
    return(
        <div>
            <h1>Tree Stocks</h1>
            <div>
                <nav className="navigation" role="navigation">
                    <Link  href="/"><a>Home</a></Link>
                    <Link  href="/stocks"><a>Stocks</a></Link>
                    <Link  href="/login"><a>Login</a></Link>
                </nav>
            </div>
        </div>
    )
}