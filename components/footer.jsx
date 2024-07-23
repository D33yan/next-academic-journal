import Link from "next/link";


        const navLinks = [
            { href: "/", text: "Home" },
            { href: "/about", text: "About" },
            { href: "/create-journal", text: "Journals" },
            { href: "/contact", text: "Contact" },
          ];
export function Footer(){
    return(
        <footer class="flex flex-col space-y-10 bg-gray-900 border-t-2 justify-center m-10">

<div class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium mt-1">
{navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.text}
                  </Link>
                ))}
</div>

<div class="flex justify-center space-x-5">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
    </a>
    <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
    </a>
</div>
<p class="text-center text-white">&copy; 2024 DivineRealm. All rights reserved.</p>
</footer>
)
}