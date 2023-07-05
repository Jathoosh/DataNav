using Unity.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using TMPro;
using ZXing;
using System.Diagnostics;

public class CodeReader : MonoBehaviour
{

    [SerializeField]
    private ARSession session;
    [SerializeField]
    private ARCameraManager cameraManager;
    [SerializeField]
    private TextMeshProUGUI TMPresultText;
    [SerializeField]
    private TextMeshProUGUI TMPtimerText;
    [SerializeField]
    private string strLastResult;
    [SerializeField]
    private bool init = false;
    
    public bool bScan = false;
    private float lastProcessingTime;

    private Texture2D t2dSource;
    private Texture2D t2dGrayScaled;
    public int intResult = 0;
    public bool bResult = false;
    private IBarcodeReader barcodeReader = new BarcodeReader
    {
        AutoRotate = true,
        Options = new ZXing.Common.DecodingOptions
        {
            TryHarder = true,
            PossibleFormats = new List<BarcodeFormat>
            {
                BarcodeFormat.QR_CODE
            }
        }
    };

    private Result result;

    private void OnEnable()
    {
        cameraManager.frameReceived += OnCameraFrameReceived;
    }

    private void OnDisable()
    {
        cameraManager.frameReceived -= OnCameraFrameReceived;
    }

    private void OnCameraFrameReceived(ARCameraFrameEventArgs eventArgs)
    {
        if (Time.time - lastProcessingTime < 0.2f || !bScan)
        {
            return;
        }
        lastProcessingTime = Time.time;

        Stopwatch stopwatch = new Stopwatch();
        stopwatch.Start();

        if (!init)
        {
            cameraManager.subsystem.currentConfiguration = cameraManager.GetConfigurations(Allocator.Temp)[0]; //0=640*480, 1= 1280*720, 2=1920*1080
            init = true;
        }

        if (!cameraManager.TryAcquireLatestCpuImage(out XRCpuImage image))
        {
            TMPresultText.text = "Error TryAcquireLatestCpuImage";
            return;
        }

        

        var conversionParams = new XRCpuImage.ConversionParams
        {
            // Get the entire image
            inputRect = new RectInt(0, 0, image.width, image.height),

            // Downsample
            outputDimensions = new Vector2Int(image.width, image.height),

            outputFormat = TextureFormat.RGBA32,

            // Flip across the vertical axis (mirror image)
            transformation = XRCpuImage.Transformation.MirrorY
        };

        // See how many bytes you need to store the final image
        int size = image.GetConvertedDataSize(conversionParams);

        // Allocate a buffer to store the image
        var buffer = new NativeArray<byte>(size, Allocator.Temp);

        // Extract the image data
        image.Convert(conversionParams, buffer);

        image.Dispose();

        t2dSource = new Texture2D(
            conversionParams.outputDimensions.x,
            conversionParams.outputDimensions.y,
            conversionParams.outputFormat,
            false);

        t2dSource.LoadRawTextureData(buffer);
        t2dSource.Apply();

        buffer.Dispose();

        // Detect and decode the barcode inside the bitmap
        result = barcodeReader.Decode(t2dSource.GetPixels32(), t2dSource.width, t2dSource.height);
        stopwatch.Stop();
        TMPtimerText.text = stopwatch.ElapsedMilliseconds.ToString() + "ms X:" + conversionParams.outputDimensions.x.ToString()+" Y:"+conversionParams.outputDimensions.y.ToString();
        if (result != null)
        {
            TMPresultText.text = "result : "+ result.Text;
            Handheld.Vibrate();
            intResult = int.Parse(result.Text);
            bScan = false;
            bResult = true;
        }
    }
}

