const Footer = () => {
  return (
    <div className="bg-slate-400 text-secondary h-8">
      <div className="h-full flex items-center justify-center">
        <p>
          <small>&#169;{new Date().getFullYear()} Md. Mehedi Hasan | All Rights Reserved</small>
        </p>
      </div>
    </div>
  );
};

export default Footer;
