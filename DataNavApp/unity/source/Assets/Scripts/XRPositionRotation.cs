using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR;
using TMPro;

public class XRPositionRotation : MonoBehaviour
{
    [SerializeField]
    private Transform xrOriginTransform;
    [SerializeField]
    private TextMeshProUGUI TMPPosText;

    void Update()
    {
        Vector3 position = xrOriginTransform.position;
        TMPPosText.text = "position: X:" + position.x.ToString("F2") + " Y:" + position.y.ToString("F2") + " Z:" + position.z.ToString("F2");

        Quaternion rotation = xrOriginTransform.rotation;
        TMPPosText.text = TMPPosText.text + "\nrotation: X:" + rotation.x.ToString("F2") + " Y:" + rotation.y.ToString("F2") + " Z:" + rotation.z.ToString("F2");

    }
}
