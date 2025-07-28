import React, { JSX, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'; // three.js

// 타입 선언
interface GLTFResult {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
}

type IPhoneProps = JSX.IntrinsicElements['group'] & {
    scale: [number, number, number]; // ModelView.tsx에서 전달하는 scale prop을 사용
    item: {
        title: string;
        color: string[];
        img: string;
    };
    size: string;
};

export default function Model({ scale, item, size, ...props }: IPhoneProps) {
    const { nodes, materials } = useGLTF(
        '/models/scene.glb'
    ) as unknown as GLTFResult;

    // 모델 색상 변경
    useEffect(() => {
        Object.entries(materials).map((material) => {
            // 색상 변경안되는 것들
            if (
                material[0] !== 'zFdeDaGNRwzccye' &&
                material[0] !== 'ujsvqBWRMnqdwPx' &&
                material[0] !== 'hUlRcbieVuIiOXG' &&
                material[0] !== 'jlzuBkUzuJqgiAK' &&
                material[0] !== 'xNrofRCqOXXHVZt'
            ) {
                (material[1] as THREE.MeshBasicMaterial).color =
                    new THREE.Color(item.color[0]);
            }
            material[1].needsUpdate = true;
        });
    }, [materials, item]);

    return (
        // <group> 요소에 ModelView에서 전달받은 scale prop을 적용
        <group {...props} dispose={null} scale={scale}>
            <mesh
                geometry={nodes.ttmRoLdJipiIOmf.geometry}
                material={materials.hUlRcbieVuIiOXG}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.DjsDkGiopeiEJZK.geometry}
                material={materials.PaletteMaterial001}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.buRWvyqhBBgcJFo.geometry}
                material={materials.PaletteMaterial002}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.MrMmlCAsAxJpYqQ_0.geometry}
                material={materials.dxCVrUCvYhjVxqy}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.wqbHSzWaUxBCwxY_0.geometry}
                material={materials.MHFGNLrDQbTNima}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.QvGDcbDApaGssma.geometry}
                material={materials.kUhjpatHUvkBwfM}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.vFwJFNASGvEHWhs.geometry}
                material={materials.RJoymvEsaIItifI}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.evAxFwhaQUwXuua.geometry}
                material={materials.KSIxMqttXxxmOYl}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.USxQiqZgxHbRvqB.geometry}
                material={materials.mcPrzcBUcdqUybC}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.TvgBVmqNmSrFVfW.geometry}
                material={materials.pIhYLPqiSQOZTjn}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.GuYJryuYunhpphO.geometry}
                material={materials.eShKpuMNVJTRrgg}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.pvdHknDTGDzVpwc.geometry}
                material={materials.xdyiJLYTYRfJffH}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.CfghdUoyzvwzIum.geometry}
                material={materials.jpGaQNgTtEGkTfo}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.DjdhycfQYjKMDyn.geometry}
                material={materials.ujsvqBWRMnqdwPx}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.usFLmqcyrnltBUr.geometry}
                material={materials.sxNzrmuTqVeaXdg}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.xXDHkMplTIDAXLN.geometry}
                material={materials.pIJKfZsazmcpEiU}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.vELORlCJixqPHsZ.geometry}
                material={materials.zFdeDaGNRwzccye}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.EbQGKrWAqhBHiMv.geometry}
                material={materials.TBLSREBUyLMVtJa}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.EddVrWkqZTlvmci.geometry}
                material={materials.xNrofRCqOXXHVZt}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.KSWlaxBcnPDpFCs.geometry}
                material={materials.yQQySPTfbEJufve}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.TakBsdEjEytCAMK.geometry}
                material={materials.PaletteMaterial003}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.IykfmVvLplTsTEW.geometry}
                material={materials.PaletteMaterial004}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.wLfSXtbwRlBrwof.geometry}
                material={materials.oZRkkORNzkufnGD}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.WJwwVjsahIXbJpU.geometry}
                material={materials.yhcAXNGcJWCqtIS}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.YfrJNXgMvGOAfzz.geometry}
                material={materials.bCgzXjHOanGdTFV}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.DCLCbjzqejuvsqH.geometry}
                material={materials.vhaEJjZoqGtyLdo}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.CdalkzDVnwgdEhS.geometry}
                material={materials.jlzuBkUzuJqgiAK}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.NtjcIgolNGgYlCg.geometry}
                material={materials.PpwUTnTFZJXxCoE}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.pXBNoLiaMwsDHRF.geometry}
                material={materials.yiDkEwDSyEhavuP}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.IkoiNqATMVoZFKD.geometry}
                material={materials.hiVunnLeAHkwGEo}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
            <mesh
                geometry={nodes.rqgRAGHOwnuBypi.geometry}
                material={materials.HGhEhpqSBZRnjHC}
                // scale={0.01} // 이 부분을 제거하거나 주석 처리
            />
        </group>
    );
}

useGLTF.preload('/models/scene.glb');
