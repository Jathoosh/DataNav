using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ArrowPoint : MonoBehaviour
{
    public Transform mainCameraTransform; // mainCamera reference
    public GameObject checkpoint; // Checkpoint reference
    public float distanceFrommainCamera = 1.0f; // Distance from the mainCamera
    [SerializeField]
    private TextMeshProUGUI TMPresultText;

    void Update()
    {

        // Ensure we have both mainCamera and checkpoint before proceeding
        if (mainCameraTransform != null && checkpoint != null)
        {
            // Calculate direction to the checkpoint
            Vector3 directionToCheckpoint = (checkpoint.transform.position - mainCameraTransform.position).normalized;
            //TMPresultText.text = "directionToCheckpoint: X:" + directionToCheckpoint.x.ToString("F2") + " Y:" + directionToCheckpoint.y.ToString("F2") + " Z:" + directionToCheckpoint.z.ToString("F2");

            //distance from the camera to the checkpoint
            float distance = Vector3.Distance(mainCameraTransform.position, checkpoint.transform.position);
            
            // Position the arrow 1 meter away from the mainCamera in the direction of the checkpoint
            transform.position = mainCameraTransform.position + directionToCheckpoint * distanceFrommainCamera;

            // Orient the arrow to point towards the checkpoint. 'forward' here refers to the arrow's forward direction. 
            // You might need to replace 'forward' with 'up' or 'right' depending on how your arrow model is oriented.
            transform.right = directionToCheckpoint;

            // Ensure the arrow stays on the ground (i.e., its y position remains constant)
            transform.position = new Vector3(transform.position.x, 0, transform.position.z);
        }
    }
}
