import { Environment, Lightformer } from '@react-three/drei';

const Lights = () => {
    return (
        // 다양한 조명과 조명 형성기를 그룹화함, 그룹을 사용하여 조명, 카메라, 메시 및 장면의 기타 물체를 구성할 수 있음
        <group name='lights'>
            {/* 장면의 배경 환경을 만드는 데 사용됨 : https://github.com/pmndrs/drei?tab=readme-ov-file#environment */}
            <Environment resolution={256}>
                <group>
                    {/* 3D 장면에서 다양한 모양과 속성을 가진 맞춤형 조명을 만드는 데 사용됨 
                        https://github.com/pmndrs/drei?tab=readme-ov-file#lightformer */}
                    <Lightformer
                        form='rect'
                        intensity={10}
                        position={[-1, 0, -10]}
                        scale={10}
                        color={'#495057'}
                    />
                    <Lightformer
                        form='rect'
                        intensity={10}
                        position={[-10, 2, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                    <Lightformer
                        form='rect'
                        intensity={10}
                        position={[10, 0, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                </group>
            </Environment>

            {/* 특정 지점에 위치한 광원을 만드는 데 사용됨, 특정 방향으로 빛을 발산하는 장면
                https://threejs.org/docs/ #api/en/lights/SpotLight */}
            <spotLight
                position={[-2, 10, 5]}
                angle={0.15}
                penumbra={1} // Penumbra 점광에 의해 드리워진 그림자의 부드러운 가장자리
                decay={0} // 광원에서 멀어질수록 빛이 어두워지는 양
                intensity={Math.PI * 0.2} // 조명 강도
                color={'#f8f9fa'}
            />
            <spotLight
                position={[0, -25, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI * 0.2}
                color={'#f8f9fa'}
            />
            <spotLight
                position={[0, 15, 5]}
                angle={0.15}
                penumbra={1}
                decay={0.1}
                intensity={Math.PI * 3}
            />
        </group>
    );
};

export default Lights;
