type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    link: string;
  };
  
  export default function FeatureCard({ icon, title, link }: FeatureCardProps) {
    return (
      <a
        href={link}
        target="_blank"
        className="flex flex-col items-center justify-center p-6 border rounded-xl hover:shadow-lg transition w-full sm:w-48"
      >
        <div className="text-4xl mb-2">{icon}</div>
        <p className="text-lg font-medium">{title}</p>
      </a>
    );
  }
  