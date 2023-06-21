using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

[System.Serializable]
public class Intersection
{
    public int id;
    public float x;
    public float y;
}

[System.Serializable]
public class RootObject
{
    public List<Intersection> intersections;
    public List<int> path;
}

public class ArrowPoint : MonoBehaviour
{
    public Transform mainCameraTransform;
    public GameObject checkpointPrefab;
    public GameObject redArrow;
    private GameObject[] checkpoints; 
    public float distanceFrommainCamera = 1.0f;
    [SerializeField]
    private TextMeshProUGUI TMPresultText;
    private int iCurrentCheckpoint = 0;
    private int iCurrentPath = 0;

    [SerializeField]
    private TextAsset jsonMap;
    [SerializeField]
    private TextAsset jsonPath;
    private int[] path;

    void Start()
    {
        if (checkpointPrefab != null)
        {
            // Convert the JSON data into a list of intersections
            RootObject rootObject = JsonUtility.FromJson<RootObject>(jsonMap.text);

            // Store the intersections in your checkpoints array
            checkpoints = new GameObject[rootObject.intersections.Count];

            for (int i = 0; i < rootObject.intersections.Count; i++)
            {
                // Créer un nouveau GameObject pour chaque intersection
                checkpoints[i] = Instantiate(checkpointPrefab, new Vector3(rootObject.intersections[i].x, 0, rootObject.intersections[i].y), Quaternion.identity);

                // Donner un nom au GameObject
                checkpoints[i].name = "Checkpoint_" + i;

                // Position the GameObject using the x and y coordinates of the intersection
                checkpoints[i].transform.position = new Vector3(rootObject.intersections[i].x, 1, rootObject.intersections[i].y);

                TMPresultText.text = TMPresultText.text + "\n" + checkpoints[i].name + " : " + checkpoints[i].transform.position.x.ToString("F2") + " " + checkpoints[i].transform.position.z.ToString("F2");

                //hide the checkpoints
                checkpoints[i].SetActive(false);
            }

            RootObject rootObjectPath = JsonUtility.FromJson<RootObject>(jsonPath.text);
            path = new int[rootObjectPath.path.Count];
            for (int i = 0; i < rootObjectPath.path.Count; i++)
            {
                path[i] = rootObjectPath.path[i];
            }

        }
    }

    void Update()
    {
        // Ensure we have both mainCamera and checkpoint before proceeding
        if (mainCameraTransform != null && checkpoints[iCurrentCheckpoint] != null)
        {
            // Calculate direction to the checkpoint
            Vector3 directionToCheckpoint = (checkpoints[iCurrentCheckpoint].transform.position - mainCameraTransform.position).normalized;

            // Position the arrow 1 meter away from the mainCamera in the direction of the checkpoint
            transform.position = mainCameraTransform.position + directionToCheckpoint * distanceFrommainCamera;
            redArrow.transform.position = mainCameraTransform.position + directionToCheckpoint * -distanceFrommainCamera;

            // Calculate the rotation to the checkpoint, but only on the y-axis
            Vector3 directionToCheckpointFlat = new Vector3(directionToCheckpoint.x, 0, directionToCheckpoint.z);
            transform.rotation = Quaternion.LookRotation(directionToCheckpointFlat) * Quaternion.Euler(0, -90, 0);
            redArrow.transform.rotation = Quaternion.LookRotation(directionToCheckpointFlat) * Quaternion.Euler(0, -90, 0);

            // Ensure the arrow stays on the ground (i.e., its y position remains constant)
            transform.position = new Vector3(transform.position.x, 0, transform.position.z);
            redArrow.transform.position = new Vector3(redArrow.transform.position.x, 0, redArrow.transform.position.z);

            // Calculate the distance to the checkpoint
            float distanceToCheckpoint = Vector3.Distance(mainCameraTransform.position, checkpoints[iCurrentCheckpoint].transform.position);
            
            // If the distance to the checkpoint is less than 1 meter, then we have reached the checkpoint
            if (distanceToCheckpoint < 1.0f)
            {
                // Increment the checkpoint index
                iCurrentPath++;
                iCurrentCheckpoint = path[iCurrentPath];

                // If we have reached the last checkpoint, then we have reached the end of the path
                if (iCurrentCheckpoint >= checkpoints.Length)
                {
                    // Reset the checkpoint index
                    iCurrentCheckpoint = 0;
                }
            }
        }
    }
}
