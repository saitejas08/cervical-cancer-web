// DOM elements
const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const fileName = document.getElementById('fileName');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');
const predictionResult = document.getElementById('predictionResult');
const confidenceResult = document.getElementById('confidenceResult');
const confidenceProgress = document.getElementById('confidenceProgress');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');
const submitBtn = document.querySelector('.submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');
const fileInputLabel = document.querySelector('.file-input-label');

// State management
let selectedFile = null;
let isAnalyzing = false;

// API configuration
const API_ENDPOINT = 'https://placeholder.url/api/predict';

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    uploadForm.addEventListener('submit', handleFormSubmit);
    imageInput.addEventListener('change', handleFileSelection);
    newAnalysisBtn.addEventListener('click', resetForm);

    // Add drag and drop functionality
    const fileInputWrapper = document.querySelector('.file-input-wrapper');
    fileInputWrapper.addEventListener('dragover', handleDragOver);
    fileInputWrapper.addEventListener('dragleave', handleDragLeave);
    fileInputWrapper.addEventListener('drop', handleDrop);
}

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    // Clear previous errors
    hideError();

    // Validate file selection
    if (!selectedFile) {
        showError('Please select an MRI image file to analyze.');
        return;
    }

    // Validate file type
    if (!isValidImageFile(selectedFile)) {
        showError('Please select a valid image file (JPG, JPEG, or PNG).');
        return;
    }

    // Start analysis
    await analyzeImage(selectedFile);
}

/**
 * Handle file selection
 */
function handleFileSelection(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        displayImagePreview(file);
        updateFileInputLabel(file.name);
    }
}

/**
 * Display image preview
 */
function displayImagePreview(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        previewImg.src = e.target.result;
        fileName.textContent = file.name;
        imagePreview.classList.remove('hidden');
    };

    reader.readAsDataURL(file);
}

/**
 * Update file input label
 */
function updateFileInputLabel(filename) {
    fileInputLabel.classList.add('active');
    fileInputLabel.innerHTML = `
        <span class="file-icon">✓</span>
        ${filename}
    `;
}

/**
 * Validate image file
 */
function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
}

/**
 * Analyze image using API
 */
async function analyzeImage(file) {
    setLoadingState(true);

    try {
        // Create FormData object
        const formData = new FormData();
        formData.append('image', file);

        // Send API request
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type header - let browser set it for FormData
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();

        // Validate response format
        if (!result.result || typeof result.confidence !== 'number') {
            throw new Error('Invalid response format from API');
        }

        // Display results
        displayResults(result);

    } catch (error) {
        console.error('Analysis error:', error);

        // Handle different error types
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('Unable to connect to the analysis service. Please check your internet connection and try again.');
        } else if (error.message.includes('API request failed')) {
            showError('The analysis service is currently unavailable. Please try again later.');
        } else {
            showError('An error occurred during analysis. Please try again.');
        }
    } finally {
        setLoadingState(false);
    }
}

/**
 * Display analysis results
 */
function displayResults(result) {
    const { result: prediction, confidence } = result;

    // Update prediction result
    predictionResult.textContent = prediction;
    predictionResult.className = `result-value ${prediction.toLowerCase()}`;

    // Update confidence result
    const confidencePercentage = Math.round(confidence * 100);
    confidenceResult.textContent = `${confidencePercentage}%`;

    // Update confidence progress bar
    confidenceProgress.style.width = `${confidencePercentage}%`;

    // Show results section
    resultsSection.classList.remove('hidden');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Set loading state
 */
function setLoadingState(loading) {
    isAnalyzing = loading;
    submitBtn.disabled = loading;

    if (loading) {
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
    } else {
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');

    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

/**
 * Reset form for new analysis
 */
function resetForm() {
    // Reset form
    uploadForm.reset();

    // Reset state
    selectedFile = null;

    // Hide preview and results
    imagePreview.classList.add('hidden');
    resultsSection.classList.add('hidden');

    // Reset file input label
    fileInputLabel.classList.remove('active');
    fileInputLabel.innerHTML = `
        <span class="file-icon">📁</span>
        Choose MRI Image
    `;

    // Clear errors
    hideError();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle drag and drop events
 */
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.style.backgroundColor = '#dbeafe';
    event.currentTarget.style.borderColor = '#3b82f6';
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.style.backgroundColor = '';
    event.currentTarget.style.borderColor = '';
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (isValidImageFile(file)) {
            selectedFile = file;
            displayImagePreview(file);
            updateFileInputLabel(file.name);
        } else {
            showError('Please drop a valid image file (JPG, JPEG, or PNG).');
        }
    }

    // Reset drag styling
    event.currentTarget.style.backgroundColor = '';
    event.currentTarget.style.borderColor = '';
}

/**
 * Initialize the application
 */
function init() {
    console.log('Cervical Cancer Detection App initialized');
    initializeEventListeners();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);