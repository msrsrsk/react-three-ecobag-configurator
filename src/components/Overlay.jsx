import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronUp, AttentionMark, CameraMark } from './ListIconSvg.jsx';
import useGame from '../stores/useGame.jsx';
import Product from '../data/product-ecobag.json';

export default function Overlay({cartList, setCartList}) {
    return (
        <div>
            <Backbtn />
            <Configurator cartList={cartList} setCartList={setCartList} />
        </div>
    )
}

function Backbtn() {
    const introToggle = useGame((state) => state.introToggle);

    return (
        <div className="backbtn">
            <button 
                className="backbtn__btn"
                onClick={introToggle}
            >
                <ChevronLeft />
                <span>Go Back</span>
            </button>
        </div>
    )
}

function Hover() {
    return (
        <div className="hover">
            <div className="hover__arrow up"></div>
            <div className="hover__arrow left"></div>
            <div className="hover__arrow right"></div>
            <div className="hover__arrow down"></div>
            <div className="hover__cursor">
                <span className="hover__text">Hover</span>
            </div>
        </div>
    )
}

function Configurator({cartList, setCartList}) {
    const gameState  = useGame((state) => state);

    const imgInputRef = useRef();

    const imgInput = document.querySelector('.configurator__img__input');
    const imgBtn = document.querySelector('.configurator__img__btn');
    
    const imgSelectChange = (e) => {
        if (e.target.files[0].size > 2097152) {
            alert('Image is too big!\nPlease upload an image less than 2MB 🙌🏻');
            gameState.getImageData(null);
            e.target.value = '';
        } else {
            gameState.getImageData(e.target.files[0]);
        }
    }

    const imgSelectKeyDown = (e) => {
        if (!imgBtn.isEqualNode(e.target)) {
            return;
        }
        if (e.keyCode === 32 || e.keyCode === 13) {
            e.preventDefault();
            imgInput.click();
        }
    }

    const imgSelectRemove = () => {
        gameState.getImageData(null);
        imgInput && (imgInput.value = '');
        gameState.getTexture(null);
        gameState.initImgConfig();
    }

    const changeScaleFnc = (e) => {
        gameState.changeImgSclXY(parseFloat(e.target.value));
        gameState.changeImgPosMinZNum();
        gameState.changeImgPosMaxZNum();

        let calcImgPosMinZ = Number((-(1.0 - (0.4 * gameState.imgSclXY) + 0.1)).toFixed(2));
        let calcImgPosMaxZ = Number((1.0 - (0.4 * gameState.imgSclXY)).toFixed(2));
        let calcImgPosMinY = Number((((gameState.imgSclXY * 0.5) + 0.5) - 0.1).toFixed(2));
        let calcImgPosMaxY = Number((3.1 - (gameState.imgSclXY * 0.5)).toFixed(2));

        gameState.changeImgPosMinZNum(calcImgPosMinZ);
        gameState.changeImgPosMaxZNum(calcImgPosMaxZ);
        gameState.changeImgPosMinYNum(calcImgPosMinY);
        gameState.changeImgPosMaxYNum(calcImgPosMaxY);

        if (gameState.imgPosZ < gameState.imgPosMinZ) {
            gameState.changeImgPosZ(calcImgPosMinZ);
        } else if (gameState.imgPosZ > gameState.imgPosMaxZ) {
            gameState.changeImgPosZ(calcImgPosMaxZ);
        } else if (gameState.imgPosY < gameState.imgPosMinY) {
            gameState.changeImgPosY(calcImgPosMinY);
        } else if (gameState.imgPosY > gameState.imgPosMaxY) {
            gameState.changeImgPosY(calcImgPosMaxY);
        }
    }

    // const downloadFnc = () => {
    //     const dlLink = document.createElement('a');
    //     dlLink.setAttribute('download', 'ecobag.png');
    //     dlLink.setAttribute(
    //         'href',
    //         document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream')
    //     );
    //     dlLink.click();
    // }

    // Image option btn click
    const designNoImgFnc = () => {
        gameState.designNoImage();
        optionRemove();
    }
    const designUploadImgFnc = () => {
        gameState.designImageUpload();
        optionAdd();
    }

    // Add option 
    const optionAdd = () => {
        const upldImgdata = Product.filter(p => p.id === '0000002001');
        setCartList(prevList => [...prevList, ...upldImgdata]);
    }
    
    // Remove option
    const optionRemove = () => {
        const removeUpldImg = cartList.filter(item => item.id !== '0000002001');
        setCartList(removeUpldImg);
    }

    useEffect(() => {
        const imgElm = document.querySelector('.configurator__img');
        if (imgElm) {
            let imageUrl = imgElm.getAttribute('src');
            gameState.getImageUrl(imageUrl);
        }
    }, [gameState.selectedImage]);

    return (
        <div className={`configurator${gameState.mobileConfig ? ' is-active' : ''}`}>
            <div 
                className="configurator__arrow"
                onClick={gameState.mbConfigToggle}
            >
                <ChevronUp color="#8d8d8d" />
            </div>
            <div className="configurator__wrapper">
                <div className="configurator__box">
                    <div className="configurator__titlebox">
                        <h2 className="configurator__title">Original Eco Bag</h2>
                        <p className="configurator__price">$5.00</p>
                        <p className="configurator__info">Let's customize the eco bag to your liking.</p>
                    </div>
                    <div className="configurator__inner">
                        <h3 className="configurator__label">- Body ( Color )</h3>
                        <div className="configurator__one">
                            <div className="configurator__btnbox">
                                {gameState.bodyColors.map((item) => (
                                    <div 
                                        key={item.color}
                                        className={`configurator__color${gameState.bodySelectedColor === item.color ? ' is-active' : ''}`}
                                        style={{
                                            borderColor: gameState.bodySelectedColor === item.color ? 
                                            item.color === '#f9f9f9' ? '#e6e6e6' : `${item.color}`
                                            : ''}}
                                        aria-label={item.name}
                                        onClick={()=> {gameState.setBodySelectedColor(item.color)}}
                                    >
                                        <span 
                                            className={`configurator__color__inner${item.color === '#f9f9f9' ? ' add-border' : ''}`}
                                            style={{backgroundColor: item.color}}
                                        ></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="configurator__inner">
                        <h3 className="configurator__label">- Design {gameState.design === 'upload_image' ? <span className="price-add">( +${
                            Product.filter(p => p.name === 'upload_image')[0].cost
                        } )</span> : '' }</h3>
                        <div className="configurator__one">
                            <div className="configurator__tab col-2">
                                <div 
                                    className={`configurator__tab__label${gameState.design === 'no_image' ? ' is-active' : ''}`}
                                    onClick={designNoImgFnc} 
                                >
                                    <span>No image</span>
                                </div>
                                <div 
                                    className={`configurator__tab__label${gameState.design === 'upload_image' ? ' is-active' : ''}`}
                                    onClick={designUploadImgFnc} 
                                >
                                    <span>Upload image</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {gameState.design === 'upload_image' ?
                        <div className="configurator__inner">
                            <h3 className="configurator__label">- Image Config</h3>
                            <div className="configurator__one">
                                {gameState.selectedImage ?
                                    <div className="configurator__imgbox">
                                        <img
                                            className="configurator__img"
                                            src={URL.createObjectURL(gameState.selectedImage)}
                                            width={'80px'} alt=""
                                        />
                                        <div className="configurator__partsbox">
                                            <p className="configurator__img__name">{gameState.selectedImage.name}</p>
                                            <button 
                                                className="configurator__img__remove" 
                                                onClick={imgSelectRemove}
                                            >
                                                Remove
                                            </button>
                                            <button 
                                                className="configurator__img__default" 
                                                onClick={gameState.initImgConfig}
                                            >
                                                default
                                            </button>
                                        </div>
                                    </div>
                                : ''}
                                <input 
                                    ref={imgInputRef}
                                    className="configurator__img__input"
                                    type="file" 
                                    accept="image/png, image/jpeg"
                                    onChange={imgSelectChange}
                                />
                                {!gameState.selectedImage ?
                                    <>
                                        <button 
                                            className="configurator__img__btn" 
                                            type="button"
                                            onClick={() => imgInputRef.current.click()}
                                            onKeyDown={imgSelectKeyDown}
                                            >
                                            Select Image
                                        </button>
                                        <span className="configurator__img__attention">
                                            <AttentionMark />
                                            Upload an image a 1 : 1 ratio and PNG format less than 2MB.
                                        </span>
                                    </>
                                : '' }
                                {gameState.selectedImage ?
                                    <div className="configurator__config">
                                        <div className="configurator__config__inner">
                                            <h3 className="configurator__config__minilabel">Sideways ( right ↔︎ left )</h3>
                                            <div className="configurator__config__rangebox">
                                                <input 
                                                    className="configurator__config__step" 
                                                    type="range" 
                                                    name="stage" 
                                                    min={gameState.imgPosMinZ}
                                                    max={gameState.imgPosMaxZ}
                                                    step="0.001" 
                                                    value={gameState.imgPosZ}
                                                    onChange={(e) => gameState.changeImgPosZ(parseFloat(e.target.value))}
                                                />                        
                                            </div>
                                        </div>
                                        <div className="configurator__config__inner">
                                            <h3 className="configurator__config__minilabel">Longitudinally ( bottom ↔︎ top )</h3>
                                            <div className="configurator__config__rangebox">
                                                <input 
                                                    className="configurator__config__step" 
                                                    type="range" 
                                                    name="stage" 
                                                    min={gameState.imgPosMinY}
                                                    max={gameState.imgPosMaxY}
                                                    step="0.001" 
                                                    value={gameState.imgPosY}
                                                    onChange={(e) => gameState.changeImgPosY(parseFloat(e.target.value))}
                                                />                        
                                            </div>
                                        </div>
                                        <div className="configurator__config__inner">
                                            <h3 className="configurator__config__minilabel">Rotation ( left ↔︎ right )</h3>
                                            <div className="configurator__config__rangebox">
                                                <input 
                                                    className="configurator__config__step" 
                                                    type="range" 
                                                    name="stage" 
                                                    min="0" 
                                                    max="6.27" 
                                                    step="0.01" 
                                                    value={gameState.rotZ}
                                                    onChange={(e) => gameState.changeRotZ(parseFloat(e.target.value))}
                                                />                        
                                            </div>
                                        </div>
                                        <div className="configurator__config__inner">
                                            <h3 className="configurator__config__minilabel">Scale ( small ↔︎ large )</h3>
                                            <div className="configurator__config__rangebox">
                                                <input 
                                                    className="configurator__config__step" 
                                                    type="range" 
                                                    name="stage" 
                                                    min="0.5" 
                                                    max="2" 
                                                    step="0.01" 
                                                    value={gameState.imgScl}
                                                    onChange={changeScaleFnc}
                                                />                        
                                            </div>
                                        </div>
                                    </div>
                                : '' }
                            </div>
                        </div>
                    : ''}
                    {/* <button 
                        className="configurator__download"
                        onClick={() => downloadFnc()}
                    >
                        Download
                        <CameraMark />
                    </button> */}
                    <button 
                        className="configurator__done"
                        onClick={() => alert('Thanks for playing !\nThis is a dummy site so nothing will happen 👀')}
                    >
                        Add to cart ( ${
                            Object.keys(cartList).reduce(
                                (acum, cur) =>
                                acum + +cartList[cur].cost, 0
                            ).toFixed(2) + ' '
                        } )
                    </button>
                </div>
            </div>
            <Hover />
        </div>
    )
}