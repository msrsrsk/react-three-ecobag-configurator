import { useEffect } from 'react';
import { TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF } from '@react-three/drei';
import useGame from '../stores/useGame.jsx';
import { easing } from 'maath';

export default function Ecobag() {
    const { nodes, materials } = useGLTF('./model/ecobag.glb');

    const { bodySelectedColor, imageUrlData, getTexture, design, texture, imgPosY, imgPosZ, rotZ, imgSclXY } = useGame((state) => ({ 
        bodySelectedColor: state.bodySelectedColor,
        imageUrlData: state.imageUrlData,
        getTexture: state.getTexture,
        design: state.design,
        texture: state.texture,
        imgPosY: state.imgPosY,
        imgPosZ: state.imgPosZ,
        rotZ: state.rotZ,
        imgSclXY: state.imgSclXY,
    }));

    useFrame((_, delta) => {
        easing.dampC(
            materials.Bag.color,
            bodySelectedColor,
            0.25,
            delta
        );
    });

    useEffect(() => {
        if (imageUrlData) {
            const loader = new TextureLoader();
    
            loader.load(imageUrlData,
                (loadedTexture) => {
                    getTexture(loadedTexture)
            });
        }
    }, [imageUrlData]);

    return (
        <mesh 
            castShadow 
            receiveShadow
            geometry={nodes.Ecobag.geometry} 
            material={materials.Bag}
            position={[-0.3, -0.15, 0]}
            rotation={[0, -Math.PI / 2.5, 0]}
            dispose={null}
        >
            {design === 'upload_image' && texture ? 
                <>
                    <Decal
                        // debug
                        position={[0, imgPosY, imgPosZ]}
                        rotation={[0, 14.15, rotZ]}
                        scale={[imgSclXY, imgSclXY, 1]}
                    >
                        <meshBasicMaterial
                            map={texture}
                            polygonOffset
                            polygonOffsetFactor={-1}
                            opacity={0.9}
                            anisotropy={16}
                            transparent
                        />
                    </Decal>
                </>
            : ''}
        </mesh>
    )
}
useGLTF.preload('./model/ecobag.glb');