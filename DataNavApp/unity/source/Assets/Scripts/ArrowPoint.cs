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

public class Rack
{
    public int id;
    public string name;
    public Location location;
    public int OnPath;
}

public class Location
{
    public float x;
    public float y;
}

[System.Serializable]
public class RootObject
{
    public List<Intersection> intersections;
    public List<int> path;
    public List<Rack> racklist;
}

public class ArrowPoint : MonoBehaviour
{
    public Transform mainCameraTransform; //defined in the inspector
    public GameObject checkpointPrefab; //defined in the inspector

    public GameObject rackPrefab; //defined in the inspector
    public GameObject redArrow; //defined in the inspector
    private GameObject[] checkpoints; 

    private GameObject[] racks;
    public float distanceFrommainCamera = 1.0f;
    [SerializeField]
    private TextMeshProUGUI TMPresultText; //defined in the inspector
    private int iCurrentCheckpoint = 0;
    private int iCurrentPath = 0;

    [SerializeField]
    private TextAsset jsonMap; //defined in the inspector
    [SerializeField]
    private TextAsset jsonPath; //defined in the inspector
    private int[] path;

    private int[] racklist;
    public float fVectorDotLimit = 0.5f; //defined in the inspector
    public GameObject LeftArrow; //defined in the inspector
    public GameObject RightArrow; //defined in the inspector

    void Start()
    {
        if (checkpointPrefab != null)
        {
            // Convert the JSON data into a list of intersections
            RootObject rootObject = JsonUtility.FromJson<RootObject>(jsonMap.text);

            /* initialisation of the checkpoints */

            // Store the intersections in your checkpoints array
            checkpoints = new GameObject[rootObject.intersections.Count];

            for (int i = 0; i < rootObject.intersections.Count; i++)
            {
                // Create a new GameObject for each intersection
                checkpoints[i] = Instantiate(checkpointPrefab, new Vector3(rootObject.intersections[i].x, 0, rootObject.intersections[i].y), Quaternion.identity);

                // Give a name to the GameObject
                checkpoints[i].name = "Checkpoint_" + i;

                // Position the GameObject using the x and y coordinates of the intersection
                checkpoints[i].transform.position = new Vector3(rootObject.intersections[i].x, 1, rootObject.intersections[i].y);

                TMPresultText.text = TMPresultText.text + "\n" + checkpoints[i].name + " : " + checkpoints[i].transform.position.x.ToString("F2") + " " + checkpoints[i].transform.position.z.ToString("F2");

                //hide the checkpoints
                checkpoints[i].SetActive(false);
            }

            /* initialisation of the racks */
            /*
            racks = new GameObject[rootObject.racklist.Count];

            for (int i = 0; i < rootObject.racklist.Count; i++)
            {
                racks[i] = Instantiate(rackPrefab, new Vector3(rootObject.racklist[i].location.x, 0, rootObject.racklist[i].location.y), Quaternion.identity);
                racks[i].name = "Rack_" + i;
                racks[i].transform.position = new Vector3(rootObject.racklist[i].location.x, 1, rootObject.racklist[i].location.y);

                TMPresultText.text = TMPresultText.text + "\n" + racks[i].name + " : " + racks[i].transform.position.x.ToString("F2") + " " + racks[i].transform.position.z.ToString("F2");

                racks[i].SetActive(false);
            }
            */

            /* initialisation of the shortest path */

            RootObject rootObjectPath = JsonUtility.FromJson<RootObject>(jsonPath.text);
            path = new int[rootObjectPath.path.Count];
            for (int i = 0; i < rootObjectPath.path.Count; i++)
            {
                path[i] = rootObjectPath.path[i];
            }

            
            

        }
        //hide left and right and red arrows
        LeftArrow.SetActive(false);
        RightArrow.SetActive(false);
        redArrow.SetActive(false);
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

            /* if the user is not looking at the checkpoint, display the red arrow and the left or right arrow*/

            // Calculate the dot product
            float dotProduct = Vector3.Dot(mainCameraTransform.forward, directionToCheckpoint);

            // Check if the checkpoint is in front of or behind the camera
            if (dotProduct > 0)
            {
                // The checkpoint is in front of the camera, do the normal screen position check
                Vector3 checkpointScreenPos = mainCameraTransform.GetComponent<Camera>().WorldToScreenPoint(checkpoints[iCurrentCheckpoint].transform.position);
                float screenCenterX = Screen.width / 2;

                // If we are looking at the checkpoint
                if (dotProduct > fVectorDotLimit)
                {
                    redArrow.SetActive(false);
                    LeftArrow.SetActive(false);
                    RightArrow.SetActive(false);
                    TMPresultText.text = "looking at the checkpoint";
                }
                else // Not directly looking at the checkpoint
                {
                    if (checkpointScreenPos.x < screenCenterX)
                    {
                        // Checkpoint is to the left of screen center
                        LeftArrow.SetActive(true);
                        RightArrow.SetActive(false);
                    }
                    else
                    {
                        // Checkpoint is to the right of screen center
                        RightArrow.SetActive(true);
                        LeftArrow.SetActive(false);
                    }

                    redArrow.SetActive(true);
                    TMPresultText.text = "not looking at the checkpoint";
                }
            }
            else
            {
                // The checkpoint is behind the camera
                // Here we reverse the logic because the screen position is reversed
                Vector3 checkpointScreenPos = mainCameraTransform.GetComponent<Camera>().WorldToScreenPoint(checkpoints[iCurrentCheckpoint].transform.position);
                float screenCenterX = Screen.width / 2;

                if (checkpointScreenPos.x < screenCenterX)
                {
                    // Checkpoint is to the left of screen center, but because it's behind the camera, we show the right arrow
                    RightArrow.SetActive(true);
                    LeftArrow.SetActive(false);
                }
                else
                {
                    // Checkpoint is to the right of screen center, but because it's behind the camera, we show the left arrow
                    LeftArrow.SetActive(true);
                    RightArrow.SetActive(false);
                }

                redArrow.SetActive(true);
                TMPresultText.text = "not looking at the checkpoint";
            }



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
