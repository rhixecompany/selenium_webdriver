# utils.js - Utility Functions Documentation

## Overview

The `utils.js` module provides reusable utility functions for Selenium WebDriver operations. These functions handle common tasks like clicking elements, extracting text, and managing stale element references.

## Functions

### exampleExplicitWait(driver)

Demonstrates explicit wait patterns for element visibility and clickability.

**Parameters:**
- `driver` - Selenium WebDriver instance

**Returns:** Promise<void>

**Example:**
```javascript
await exampleExplicitWait(driver);
```

---

### safeClick(driver, locator, maxRetries = 3)

Clicks an element with retry logic for stale element references. Includes a 500ms delay between retries.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the element
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<void>

**Example:**
```javascript
await safeClick(driver, By.css('.myButtonClass'));
```

---

### performGet(driver, url)

Navigates to a URL and waits for a specific element to be located.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `url` - Target URL to navigate to

**Returns:** Promise<void>

**Example:**
```javascript
await performGet(driver, 'https://asuracomic.net/series');
```

---

### clickElement(driver, locator, maxRetries = 3)

Clicks an element with retry logic and 500ms delay between retries.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the element
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<void>

---

### clickNormalElement(driver, locator, maxRetries = 3)

Clicks an element without delay between retries.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the element
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<boolean> - Returns false if element is not enabled

---

### textElement(driver, locator, maxRetries = 3)

Gets text content from an element with retry logic and 500ms delay.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the element
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<string> - Element text content

---

### textNormalElement(driver, locator, maxRetries = 3)

Gets text content without delay between retries.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the element
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<string> - Element text content

---

### textareaElement(driver, locator, maxRetries = 3)

Gets text content from a textarea element, trimming whitespace and normalizing line endings.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the textarea
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<string> - Trimmed text content

---

### imageElement(driver, locator, maxRetries = 3)

Gets the `src` attribute from an image element.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the image
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<string> - Image source URL

---

### hrefElement(driver, locator, maxRetries = 3)

Gets the `href` attribute from a link element.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for the link
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<string> - Link href URL

---

### textElements(driver, locator, maxRetries = 3)

Finds multiple elements and returns them as an array.

**Parameters:**
- `driver` - Selenium WebDriver instance
- `locator` - By locator for elements
- `maxRetries` - Maximum retry attempts (default: 3)

**Returns:** Promise<WebElement[]> - Array of WebElements

---

## Error Handling

All functions handle `StaleElementReferenceError` by retrying. Other errors are re-thrown to allow caller handling.

**Error Messages:**
- `"Failed to click element after X retries."`
- `"Failed to get textElement after X retries."`
- etc.