import re
import os

def process_file():
    path = "index.html"
    if not os.path.exists(path):
        print("index.html not found!")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Define standard color replacements
    replacements = {
        "red-650": "red-650", # Let's handle all 650/755/205 directly below
        "red-755": "red-700",
        "red-605": "red-600",
        "brand-850": "brand-800",
        "brand-750": "brand-700",
        "slate-205": "slate-250", # Wait, let's map to standard slate-200 or 100/300
        "slate-355": "slate-300",
        "slate-405": "slate-400",
        "slate-420": "slate-400",
        "slate-425": "slate-400",
        "slate-450": "slate-400",
        "slate-455": "slate-400",
        "slate-550": "slate-500",
        "slate-555": "slate-500",
        "slate-655": "slate-600",
        "slate-650": "slate-600",
        "slate-707": "slate-700",
        "slate-805": "slate-800",
        "slate-905": "slate-900",
        "slate-620": "slate-600",
        "orange-655": "orange-600",
        "red-805": "red-800"
    }

    # Perform direct bulk substitutions
    for old, new in replacements.items():
        if old == "slate-205":
            content = content.replace("bg-slate-205", "bg-slate-100")
            content = content.replace("slate-205", "slate-200")
        elif old == "red-650":
            content = content.replace("bg-red-650", "bg-red-600")
            content = content.replace("text-red-105", "text-red-500")
            content = content.replace("red-650", "red-600")
            content = content.replace("bg-red-55", "bg-red-100")
        else:
            content = content.replace(old, new)


    # Inject Typewriter component into index.html
    # We will look for const Icons = { ... } and insert it after.
    typewriter_code = """
        // Premium Typewriter component (Smooth, iterative, un-slop)
        const Typewriter = ({ phrases, speed = 60, eraseSpeed = 30, delay = 2200 }) => {
            const [text, setText] = useState('');
            const [phraseIndex, setPhraseIndex] = useState(0);
            const [isDeleting, setIsDeleting] = useState(false);

            useEffect(() => {
                let timer;
                const activePhrase = phrases[phraseIndex];

                if (isDeleting) {
                    timer = setTimeout(() => {
                        setText(prev => prev.substring(0, prev.length - 1));
                    }, eraseSpeed);
                } else {
                    timer = setTimeout(() => {
                        setText(activePhrase.substring(0, text.length + 1));
                    }, speed);
                }

                // Pauses when phrase fully typed
                if (!isDeleting && text === activePhrase) {
                    timer = setTimeout(() => setIsDeleting(true), delay);
                }
                // Advances when phrase fully erased
                else if (isDeleting && text === '') {
                    setIsDeleting(false);
                    setPhraseIndex(prev => (prev + 1) % phrases.length);
                }

                return () => clearTimeout(timer);
            }, [text, isDeleting, phraseIndex, phrases]);

            return (
                <span className="inline-block relative min-h-[3.6rem] md:min-h-[4.5rem]">
                    <span className="bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent">{text}</span>
                    <span className="ml-1 inline-block w-1.5 h-8 md:h-12 bg-brand animate-ping absolute bottom-1">&nbsp;</span>
                </span>
            );
        };
"""

    if "const Icons = {" in content:
        # Find ending match of Icons definition
        part1 = content.split("};", 1)  # splits at first }; which is end of Icons
        content = part1[0] + "};" + typewriter_code + part1[1]


    # Replace the static home-page hero header with our dynamic Typewriter
    static_hero = """                                        <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900 leading-none">
                                            The <span className="bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent">Impartial Way</span> to Hire Developers at Scale
                                        </h1>"""

    new_animated_hero = """                                        <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-slate-900 leading-tight">
                                            The Impartial Way to <br/>
                                            <Typewriter phrases={[
                                                "Hire Developers at Scale",
                                                "Audit Algorithms for Bias",
                                                "Secure Absolute Fairness"
                                            ]} />
                                        </h1>"""

    if static_hero in content:
        content = content.replace(static_hero, new_animated_hero)
        print("Hero header replaced successfully.")
    else:
        # Let's search with regex to replace if slightly different spaces
        content = re.sub(r'<h1 className="text-4xl[^>]*>.*?Impartial Way.*?Hire Developers.*?</h1>', new_animated_hero, content, flags=re.DOTALL)
        print("Hero header pattern-matched & animated.")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Alignment completed successfully!")

if __name__ == "__main__":
    process_file()
