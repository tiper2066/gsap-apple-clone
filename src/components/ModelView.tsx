import { PerspectiveCamera, View } from '@react-three/drei';
import { Suspense } from 'react';
import Lights from './Lights';
import IPhone from './iPhone'; // ******************* iPhone 모델 컴포넌트

const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    size,
    item,
}) => {
    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${
                index === 2 ? 'right-[-100%]' : ''
            }`}
        >
            {/* Ambient Light */}
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            {/* Ambient Light : 환경 조명 */}
            <Lights />

            <Suspense fallback={<div>Loading</div>}>
                <IPhone />
            </Suspense>
        </View>
    );
};
export default ModelView;
