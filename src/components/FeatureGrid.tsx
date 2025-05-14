import FeatureCard from "./FeatureCard";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";

export default function FeatureGrid() {
  return (
    <section className="text-center px-4 mt-12">
      <h2 className="text-2xl font-semibold mb-6">AI-powered Portfolio</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
        <FeatureCard icon={<FaLinkedin />} title="LinkedIn" link="#" />
        <FeatureCard icon={<MdWorkOutline />} title="Projects" link="#" />
        <FeatureCard icon={<FaGithub />} title="GitHub" link="#" />
        <FeatureCard icon={<HiOutlineDocumentText />} title="Resume" link="#" />
      </div>
    </section>
  );
}
