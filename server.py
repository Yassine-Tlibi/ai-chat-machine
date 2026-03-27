import http.server
import socketserver
import urllib.request
import urllib.error
import json
import logging

PORT = 8000

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.end_headers()

    def do_POST(self):
        if self.path == '/v1/chat/completions':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)

            req = urllib.request.Request('https://api.openai.com/v1/chat/completions', data=post_data, headers={
                'Content-Type': self.headers.get('Content-Type', 'application/json'),
                'Authorization': self.headers.get('Authorization', '')
            })

            try:
                with urllib.request.urlopen(req) as response:
                    self.send_response(response.getcode())
                    self.send_header('Content-Type', response.headers.get('Content-Type', 'application/json'))
                    self.end_headers()
                    self.wfile.write(response.read())
            except urllib.error.HTTPError as e:
                self.send_response(e.code)
                self.send_header('Content-Type', e.headers.get('Content-Type', 'application/json'))
                self.end_headers()
                self.wfile.write(e.read())
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({'error': {'message': str(e)}}).encode())
        else:
            self.send_error(404, "Not Found")

with socketserver.TCPServer(("", PORT), ProxyHTTPRequestHandler) as httpd:
    print(f"Proxy server running at http://localhost:{PORT}")
    print("Serving claude.html and proxying /v1/chat/completions to OpenAI")
    httpd.serve_forever()
