// import { Perf } from 'r3f-perf';
import { Center, Environment } from '@react-three/drei';
import CameraRig from './CameraRig.jsx';
import Ecobag from './Ecobag.jsx';
import Shadows from './Shadows.jsx';

export default function Experience() {

    return <>
        <color args={['#f1f1f1']} attach="background" />

        {/* <Perf position="top-left" /> */}

        <ambientLight intensity={1.9} />
        <Environment preset='city' />

        <CameraRig>
            <Center>
                <Ecobag />
                <Shadows />
            </Center>
        </CameraRig>
    </>
}