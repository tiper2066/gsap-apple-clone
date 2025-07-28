// ModelView.tsx (수정)

import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import { Suspense } from 'react';
import Lights from './Lights';
import IPhone from './iPhone';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Loader from './Loader';
// import { useThree } from '@react-three/fiber'; // useThree 훅 제거

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
    // useThree 훅 사용을 제거합니다.
    // const { viewport } = useThree();

    // 브라우저 너비에 따라 동적으로 조절하는 대신,
    // Model.tsx의 `canvasWrapperRef`에 설정된 CSS 크기 (w-full h-[75vh] md:h-[90vh])와
    // 카메라 설정 (position: [0,0,4])을 고려하여 최적의 scale 값을 직접 설정합니다.
    // 이 값은 개발 모드에서 브라우저 크기를 조절하며 직접 찾아야 합니다.
    // 이전 답변에서 제안했던 2, 2.2 또는 그 주변 값에서 다시 시작해보세요.
    // 예시:
    const fixedScale: [number, number, number] =
        size === 'small' ? [0.15, 0.15, 0.15] : [0.3, 0.3, 0.3]; // 이 값을 조정해 주세요

    // 만약 더 큰 화면에서 여전히 작거나 크게 느껴진다면, 아래의 값들을 조금 더 조정해보세요.
    // 예를 들어, 더 크게 하고 싶다면 [2.5, 2.5, 2.5] 등으로.
    // 또는 카메라의 z축 position을 늘려서 (예: [0, 0, 5] 나 [0, 0, 6]) 모델을 멀리 떨어뜨릴 수도 있습니다.

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

            {/* 카메라 포지션을 조절하여 모델의 보이는 크기를 조절할 수 있습니다.
                position={[0, 0, 4]}는 기본적으로 적당한 거리를 의미하지만,
                모델이 여전히 너무 크거나 작게 느껴진다면 이 Z축 값을 조정해보세요.
                값을 늘리면 모델이 작아 보이고, 줄이면 커 보입니다.
            */}
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            {/* Ambient Light : 환경 조명 */}
            <Lights />

            {/* OrbitControls 추가 */}
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
            {/* 모델을 group 으로 감싼 후 크기, 위치 제어 속성 추가 */}
            <group
                ref={groupRef}
                name={index === 1 ? 'small' : 'large'}
                position={[0, 0, 0]}
            >
                <Suspense fallback={<Loader />}>
                    <IPhone
                        // 동적으로 계산된 scale 값을 전달합니다.
                        scale={fixedScale} // 이전에 제안했던 고정된 스케일 값을 사용
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>
        </View>
    );
};

export default ModelView;
