import urllib.request
import urllib.error
import os
import json

def check_key(api_key):
    # We use the /v1/models endpoint as it's a quick and free way to check authentication
    req = urllib.request.Request(
        'https://api.chatanywhere.tech/v1/models',
        headers={'Authorization': f'Bearer {api_key}'}
    )
    try:
        with urllib.request.urlopen(req) as response:
            if response.getcode() == 200:
                return "✅ Valid and Working"
    except urllib.error.HTTPError as e:
        if e.code == 401:
            return "❌ Invalid (401 Unauthorized)"
        elif e.code == 429:
            # 429 means the key is recognized, but it has hit a rate limit or ran out of credits
            error_body = e.read().decode('utf-8')
            try:
                err_data = json.loads(error_body)
                msg = err_data.get('error', {}).get('message', '').lower()
                if "quota" in msg or "exceeded" in msg:
                    return "⚠️ Valid, but Quota Exceeded / No Credits (429)"
            except:
                pass
            return "⚠️ Valid, but Rate Limited (429)"
        else:
            return f"⚠️ API Error ({e.code})"
    except Exception as e:
        return f"⚠️ Error ({str(e)})"

if __name__ == "__main__":
    filename = "test.txt"

    # Check if test.txt exists
    if not os.path.exists(filename):
        print(f"Error: '{filename}' not found.")
        print(f"Please create a file named '{filename}' in this folder and paste your API keys inside (one per line).")
        exit(1)

    # Read keys from file
    with open(filename, 'r') as f:
        # Strip whitespace and ignore empty lines
        keys = [line.strip() for line in f if line.strip()]

    if not keys:
        print(f"No keys found in '{filename}'. Please add some keys.")
        exit(1)

    print(f"Found {len(keys)} keys to test in '{filename}'.\n")
    print("-" * 50)

    # Test each key
    for i, key in enumerate(keys, 1):
        # Mask the key for display purposes (e.g. sk-1234...abcd)
        masked_key = f"{key[:8]}...{key[-4:]}" if len(key) > 12 else "Invalid Format"
        status = check_key(key)
        print(f"[{i}/{len(keys)}] {masked_key.ljust(18)} -> {status}")

    print("-" * 50)
    print("Finished checking all keys.")
