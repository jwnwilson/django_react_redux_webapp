from django.test import TestCase
from django.test import Client


class ModularPageTestCase(TestCase):
    fixtures = ['default.json']

    def test_home_page(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, 200)
