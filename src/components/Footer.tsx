import "../styles/HeaderFooter.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Comunitate360. Toate drepturile
        rezervate.
      </p>
    </footer>
  );
};

export default Footer;
