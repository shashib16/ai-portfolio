function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Shashi Tiwari. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;