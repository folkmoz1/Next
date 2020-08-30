import Link from "next/link";
import { useRouter } from "next/router";

const About = () => {
    const router = useRouter();

    return (
        <div>
            <h1>About Page</h1>
            <p>Hello : {router.query.name}</p>
            <Link href={'/'}>
                <a>go to home</a>
            </Link>
        </div>
    );
}

export default About;
