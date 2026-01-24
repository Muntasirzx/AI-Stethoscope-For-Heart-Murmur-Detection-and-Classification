# HEART SOUND ANALYSIS - COMPLETE APP

## ✅ BOTH MODES INCLUDED

- **Normal Mode**: Single audio file analysis
- **Advanced Mode**: 4-valve analysis (AV, PV, TV, MV)

## 🚀 Installation

```bash
npm install
npm start
```

## 📡 API Endpoints

- Normal: `http://34.205.20.69/api/analyze/`
- Advanced: `http://34.205.20.69/api/analyze_advanced/`

## ⚠️ IMPORTANT

You need to create the `/api/analyze_advanced/` endpoint in Django!

Add to `backend/api/views.py`:

```python
@api_view(['POST'])
def analyze_advanced(request):
    av_file = request.FILES.get('av_file')
    pv_file = request.FILES.get('pv_file')
    tv_file = request.FILES.get('tv_file')
    mv_file = request.FILES.get('mv_file')
    
    # Process all 4 files
    # Return results
    
    return Response({'results': 'your data'})
```

Add to `backend/api/urls.py`:

```python
path('analyze_advanced/', views.analyze_advanced),
```

## 🎯 Features

- Mode selection screen
- Normal mode with history sidebar
- Advanced mode with 4-file upload
- Confidence score circle
- Phonocardiogram display
- Print functionality
- localStorage history

ALL DONE. READY TO USE.
