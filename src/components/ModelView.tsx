import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'; //  OrbitControls 추가
import { Suspense } from 'react';
import Lights from './Lights';
import IPhone from './iPhone'; //  iPhone 모델 컴포넌트
import * as THREE from 'three'; //  three.js
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'; //  OrbitControls 구현
import Loader from './Loader'; // ******************************** 사용자 정의 로더 추가

interface ModelViewProps {
    index: number;
    groupRef: React.MutableRefObject<THREE.Group | null>;
    gsapType: string;
    controlRef: React.MutableRefObject<OrbitControlsImpl | null>;
    setRotationState: (angle: number) => void;
    size: string;
    item: {
        title: string;
        color: string[];
        img: string;
    };
}

const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    size,
    item,
}: ModelViewProps) => {
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

            {/*  OrbitControls 추가  */}
            <OrbitControls
                makeDefault
                ref={controlRef}
                enableZoom={false} // 줌 방지
                enablePan={false} // 이동 방지
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)} // 모델을 중앙에 배치
                onEnd={() => {
                    if (controlRef.current) {
                        // 이동을 멈추면 모델의 회전상태를 업데이트
                        setRotationState(
                            controlRef.current.getAzimuthalAngle()
                        );
                    }
                }}
            />
            {/*  모델을 group 으로 갑싼 후 크기, 위치 제어 속성 추가  */}
            <group
                ref={groupRef}
                name={index === 1 ? 'small' : 'large'}
                position={[0, 0, 0]}
            >
                <Suspense fallback={<Loader />}>
                    <IPhone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>
        </View>
    );
};

export default ModelView;
