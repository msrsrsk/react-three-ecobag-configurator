import { ArrowRight } from './ListIconSvg.jsx';
import useGame from '../stores/useGame.jsx';

export default function Intro() {
    const { introToggle, loading } = useGame((state) => ({ 
        introToggle: state.introToggle,
        loading: state.loading,
    }));

    return (
        <div className="intro">
            <header className="intro__header">
                <div className="intro__inner">
                    <div className="intro__textbox">
                        <h1 className="intro__title">Original Eco Bag</h1>
                        <p className="intro__text">Let's customize the eco bag <br className="hidden-pc" />to your liking.</p>
                    </div>
                    <nav className="intro__nav">
                        <ul className="intro__menubox">
                            <li className="intro__menu">
                                <a href="https://react-three-bicycle-configurator.vercel.app">Bicycle</a>
                            </li>
                            <li className="intro__menu">
                                <a href="https://react-three-shelf-configurator.vercel.app">Shelf</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <p className={`intro__loading${!loading ? ' is-hidden' : ''}`}>Loading...</p>
            <button 
                className="intro__btn"
                onClick={introToggle}
                disabled={loading}
            >
                <span>Customize it</span>
                <ArrowRight />
            </button>
        </div>
    )
}