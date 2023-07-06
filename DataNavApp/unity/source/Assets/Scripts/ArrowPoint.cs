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
    public int[] roads;
}

[System.Serializable]
public class Location
{
    public float x;
    public float y;
}

[System.Serializable]
public class Rack
{
    public int id;
    public string name;
    public Location location;
    public int onPath;
}

[System.Serializable]
public class Road
{
    public int id;
    public string direction;
    public int start_node;
    public int end_node;
    public int length;
}

[System.Serializable]
public class Marker
{
    public int id;
    public int intersection;
    public Location location;
    public Location rotation;
}

[System.Serializable]
public class RootObject
{
    public List<Road> Roads;
    public List<Intersection> intersections;
    public List<int> path;
    public List<Rack> racklist;
    public List<Marker> markers;
}


public class ArrowPoint : MonoBehaviour
{
    public Transform mainCameraTransform; //defined in the inspector
    public GameObject checkpointPrefab; //defined in the inspector
    public GameObject World; //defined in the inspector
    public GameObject rackPrefab; //defined in the inspector
    public GameObject redArrow; //defined in the inspector

    private GameObject[] checkpoints; 
    private GameObject[] racks;
    private Marker[] markers;

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

    public float fVectorDotLimit = 0.5f; //defined in the inspector
    public GameObject LeftArrow; //defined in the inspector
    public GameObject RightArrow; //defined in the inspector
    public GameObject CodeReaderManager; //defined in the inspector

    private CodeReader codeReaderScript;
    private bool bLoadedMap = false;

    public float fPixeltoMeter = 0.075f; //defined in the inspector

    void Start()
    {
        codeReaderScript = CodeReaderManager.GetComponent<CodeReader>();
        //hide left and right and red arrows
        loadMap("");
        LeftArrow.SetActive(false);
        RightArrow.SetActive(false);
        redArrow.SetActive(false);
    }

    void loadMap(string message)
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
                checkpoints[i] = Instantiate(checkpointPrefab, new Vector3((int)(rootObject.intersections[i].x * fPixeltoMeter), 0, (int)(rootObject.intersections[i].y * fPixeltoMeter)), Quaternion.identity, World.transform);

                // Give a name to the GameObject
                checkpoints[i].name = "Checkpoint_" + i;

                // Position the GameObject using the x and y coordinates of the intersection
                checkpoints[i].transform.position = new Vector3((int)(rootObject.intersections[i].x * fPixeltoMeter), 1, (int)(rootObject.intersections[i].y * fPixeltoMeter));

                TMPresultText.text = TMPresultText.text + "\n" + checkpoints[i].name + " : " + checkpoints[i].transform.position.x.ToString("F2") + " " + checkpoints[i].transform.position.z.ToString("F2");

                //hide the checkpoints
                checkpoints[i].SetActive(false);
            }

            /* initialisation of the racks */
            
            racks = new GameObject[rootObject.racklist.Count];

            for (int i = 0; i < rootObject.racklist.Count; i++)
            {
                racks[i] = Instantiate(rackPrefab, new Vector3((int)(rootObject.racklist[i].location.x * fPixeltoMeter), 0, (int)(rootObject.racklist[i].location.y * fPixeltoMeter)), Quaternion.identity, World.transform);
                racks[i].name = "Rack_" + i;
                racks[i].transform.position = new Vector3((int)(rootObject.racklist[i].location.x * fPixeltoMeter), 1, (int)(rootObject.racklist[i].location.y * fPixeltoMeter));

                TMPresultText.text = TMPresultText.text + "\n" + racks[i].name + " : " + racks[i].transform.position.x.ToString("F2") + " " + racks[i].transform.position.z.ToString("F2");

                racks[i].SetActive(false);
            }
            

            /* initialisation of the shortest path */

            RootObject rootObjectPath = JsonUtility.FromJson<RootObject>(jsonPath.text);
            path = new int[rootObjectPath.path.Count];
            for (int i = 0; i < rootObjectPath.path.Count; i++)
            {
                path[i] = rootObjectPath.path[i];
                TMPresultText.text = TMPresultText.text + "\n" + path[i];
            }

            /* initialisation de tous les markers*/
            markers = new Marker[rootObject.markers.Count];
            for (int i = 0; i < rootObject.markers.Count; i++)
            {
                markers[i] = rootObject.markers[i];
            }

            /* coloration des checkpoints du chemin le plus court */
            for (int i = 0; i < path.Length; i++)
            {
                if (i < path.Length - 1)
                {
                    checkpoints[path[i]].GetComponent<Renderer>().material.color = Color.blue;
                    checkpoints[path[i]].SetActive(true);
                }
                else
                {
                    racks[path[i]].GetComponent<Renderer>().material.color = Color.blue;
                    racks[path[i]].SetActive(true);
                }
            }  
            bLoadedMap = true;
        }
    }

    void Update()
    {
        // Ensure we have both mainCamera and checkpoint before proceeding
        if (mainCameraTransform != null && checkpoints[iCurrentCheckpoint] != null && bLoadedMap == true)
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
                if (iCurrentPath == path.Length-1)
                {
                    //set to the rack position
                    iCurrentCheckpoint = path[iCurrentPath];
                    //show the rack
                    checkpoints[iCurrentCheckpoint] = racks[iCurrentCheckpoint];

                }
                if (iCurrentPath < path.Length)
                {
                    iCurrentCheckpoint = path[iCurrentPath];
                }

                // If we have reached the last checkpoint, then we have reached the end of the path
                if (iCurrentCheckpoint >= checkpoints.Length)
                {
                    // Reset the checkpoint index
                    iCurrentCheckpoint = 0;
                }
            }
            if (codeReaderScript.bResult)
            {
                Marker marker = GetMarkerById(codeReaderScript.intResult);
                if (marker == null)
                {
                    codeReaderScript.bResult = false;
                    return;
                }
                /*
                Vector3 newCameraPosition = new Vector3(marker.location.x, 1, marker.location.y);

                Quaternion newCameraRotation = Quaternion.Euler(0, marker.rotation.y, 0);

                Vector3 translation = newCameraPosition - mainCameraTransform.position;

                // Reset the rotation of World before applying new rotation
                World.transform.rotation = Quaternion.identity;

                World.transform.position += translation;

                World.transform.rotation = newCameraRotation;
                */
                codeReaderScript.bResult = false;
                TMPresultText.text = TMPresultText.text + "\nMarker " + marker.id + " found" + "\nx:" + marker.location.x + " y:" + marker.location.y + " r:" + marker.rotation.y;
                
                TMPresultText.text = TMPresultText.text + "\nmoved to x:" + World.transform.position.x + " y:" + World.transform.position.y + " z:" + World.transform.position.z;
                TMPresultText.text = TMPresultText.text + "\nrotation y:" + World.transform.rotation.y;
                
            }
        }  
    }

    public Marker GetMarkerById(int id)
    {
        // Trouve le premier Marker dans la liste qui a l'ID spécifié
        foreach (Marker marker in markers)
        {
            if (marker.id == id)
            {
                return marker;
            }
        }

        // Si aucun Marker avec l'ID spécifié n'a été trouvé, renvoie null
        return null;
    }

    
}
