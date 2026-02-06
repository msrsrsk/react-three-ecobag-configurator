import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(subscribeWithSelector((set) => {
    return {
        design: 'no_image',
        intro: true,
        loading: true,
        mobileConfig: false,
        selectedImage: null,
        imageUrlData: null,
        texture: null,
        imgPosZ: -0.01,
        imgPosMinZ: -0.25,
        imgPosMaxZ: 0.2,
        imgPosY: 1.9,
        imgPosMinY: 1.4,
        imgPosMaxY: 2.1,
        rotZ: 0,
        imgSclXY: 2,

        bodySelectedColor: '#f9f9f9',
        bodyColors: [
            {
                color: '#f9f9f9',
                name: 'Yuki',
            },
            {
                color: '#7ccfcc',
                name: 'Ajisai',
            },
            {
                color: '#b2c778',
                name: 'Yomogi',
            },
            {
                color: '#fedc75',
                name: 'Himawari',
            },
            {
                color: '#e9906f',
                name: 'Kinmokusei',
            },
            {
                color: '#ec899a',
                name: 'Sakura',
            },
            {
                color: '#5f5e5e',
                name: 'Sumi',
            },
        ],
        setBodySelectedColor: (color) => set({ bodySelectedColor: color }),

        introToggle: () => {
            set((state) => ({ intro: !state.intro }))
        },
        loadingToggle: () => {
            set((state) => ({ 
                ...state,
                loading: false 
            }))
        },
        mbConfigToggle: () => {
            set((state) => ({ mobileConfig: !state.mobileConfig }))
        },
        getImageData: (setSelectedImage) => {
            set((state) => ({ 
                ...state,
                selectedImage: setSelectedImage 
            }))
        },
        getImageUrl: (setImageUrlData) => {
            set((state) => ({ 
                ...state,
                imageUrlData: setImageUrlData 
            }))
        },
        getTexture: (setTexture) => {
            set((state) => ({ 
                ...state,
                texture: setTexture 
            }))
        },
        designNoImage: () => {
            set((state) => {
                if (state.design === 'upload_image') {
                    return {design: 'no_image'}
                }

                return {}
            })
        },
        designImageUpload: () => {
            set((state) => {
                if (state.design === 'no_image') {
                    return {design: 'upload_image'}
                }

                return {}
            })
        },
        initImgConfig: () => {
            set((state) => ({ 
                ...state,
                imgPosZ: -0.01,
                imgPosMinZ: -0.25,
                imgPosMaxZ: 0.2,
                imgPosY: 1.9,
                imgPosMinY: 1.4,
                imgPosMaxY: 2.1,
                rotZ: 0,
                imgSclXY: 2,
            }))
        },
        changeImgPosZ: (setImgPosZ) => {
            set((state) => ({ 
                ...state,
                imgPosZ: setImgPosZ 
            }))
        },
        changeImgPosY: (setImgPosY) => {
            set((state) => ({ 
                ...state,
                imgPosY: setImgPosY 
            }))
        },
        changeRotZ: (setRotZ) => {
            set((state) => ({ 
                ...state,
                rotZ: setRotZ 
            }))
        },
        changeImgSclXY: (setImgSclXY) => {
            set((state) => ({ 
                ...state,
                imgSclXY: setImgSclXY 
            }))
        },
        changeImgPosMinZNum: (setImgPosMinZ) => {
            set((state) => ({ 
                ...state,
                imgPosMinZ:  setImgPosMinZ
            }))
        },
        changeImgPosMaxZNum: (setImgPosMaxZ) => {
            set((state) => ({ 
                ...state,
                imgPosMaxZ:  setImgPosMaxZ
            }))
        },
        changeImgPosMinYNum: (setImgPosMinY) => {
            set((state) => ({ 
                ...state,
                imgPosMinY:  setImgPosMinY
            }))
        },
        changeImgPosMaxYNum: (setImgPosMaxY) => {
            set((state) => ({ 
                ...state,
                imgPosMaxY:  setImgPosMaxY
            }))
        },
    }
}))