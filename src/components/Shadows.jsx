import { memo } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Shadows = memo(function Shadows() {

    return (
        <AccumulativeShadows
            temporal
            frames={100}
            toneMapped={true}
            alphaTest={0.7}
            opacity={0.2}
            scale={6}
            rotation={[0, -1.2, -Math.PI / 2]}
            position={[-0.4, 1.9, -1.5]}
        >
            <RandomizedLight
                intensity={2.2}
                amount={8}
                radius={4}
                ambient={2}
                position={[5, 5, -10]}
                bias={0.001}
            />
            <RandomizedLight
                amount={4}
                radius={5}
                intensity={1}
                ambient={2.2}
                position={[-5, 5, -9]}
                bias={0.001}
            />
        </AccumulativeShadows>
    )

});

export default Shadows;