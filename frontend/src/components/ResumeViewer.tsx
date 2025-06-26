import { HiOutlineDocumentDownload } from "react-icons/hi";
import { RESUME_NAME } from "../utils/constant";

export default function ResumeViewer() {
    return (
        <section id="resume" className="px-4 py-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">My Resume</h2>
            <div className="max-w-4xl mx-auto border rounded-lg shadow-lg p-4 bg-white">
                <iframe
                    src={`/${RESUME_NAME}`}
                    width="100%"
                    className="w-full h-[600px] rounded"
                    title="Resume"
                ></iframe>
                <a
                    href={`/${RESUME_NAME}`}
                    download
                    className="inline-flex items-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    <HiOutlineDocumentDownload className="mr-2" />
                    Download Resume
                </a>
            </div>
        </section>
    );
}
