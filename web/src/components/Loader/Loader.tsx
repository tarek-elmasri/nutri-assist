import './loader.css';

type LoaderProps = {
  fullScreen?: boolean;
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({ fullScreen, text }) => {
  return (
    <div className={`loader ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loader__container" />
      <p>{text || 'Loading ...'}</p>
    </div>
  );
};

export default Loader;
