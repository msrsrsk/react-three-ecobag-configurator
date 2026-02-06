import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import Experience from './components/Experience.jsx';
import Intro from './components/Intro.jsx';
import Overlay from './components/Overlay.jsx';
import useGame from './stores/useGame.jsx';

export default function App() {
    const { intro, loadingToggle }  = useGame((state) => ({ 
        intro: state.intro,
        loadingToggle: state.loadingToggle
    }));

    const [cartList, setCartList] = useState([
        {
            id: '0000002000',
            name: 'ecobag',
            cost:'5.00',
        },
    ]);

    const { progress } = useProgress();

    useEffect(() => {
        if (progress === 100) {
            loadingToggle();
        }
    }, [progress]);

    return <>
        <Canvas
            flat
            shadows
            camera={ {
                fov: 50,
                near: 0.1,
                position: [ 0, 0.5, 2 ]
            } }
            // gl={{ preserveDrawingBuffer: true }}
        >
            <Experience />
        </Canvas>
        {intro ? <Intro /> : <Overlay cartList={cartList} setCartList={setCartList} />}
    </>
}