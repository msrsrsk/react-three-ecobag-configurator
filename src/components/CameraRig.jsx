import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useGame from '../stores/useGame.jsx';
import { easing } from 'maath';

export default function CameraRig({children}) {
    const { intro } = useGame((state) => ({ intro: state.intro }));
    
    const group = useRef();

    const mqlWidth = window.matchMedia('(min-width: 900px)');

    useFrame((state, delta) => {
        const handleMediaQuery = function(mqlWidth) {
            if (!mqlWidth.matches) {
                easing.damp3(state.camera.position,
                    intro ? [0, 3, 12] : [0, 1, 12], 
                    0.25, 
                    delta
                )
            } else if (mqlWidth.matches) {
                easing.damp3(state.camera.position,
                    [intro ? 0 : 1.7, 2.2, 8], 
                    0.25, 
                    delta
                )
            }
        };
        
        mqlWidth.addListener(() => handleMediaQuery(mqlWidth));
        handleMediaQuery(mqlWidth);

        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 12, -state.pointer.x / 5, 0],
            0.25,
            delta
        )
    });

    return (
        <group ref={group}>
            {children}
        </group>
    )
}