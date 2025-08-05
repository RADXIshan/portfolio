const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-[#333] text-white py-5 text-center m-0">
      <p>© {date} Ishan Roy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
