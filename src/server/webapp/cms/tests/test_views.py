from django.test import TestCase
from django.test import Client
from webapp.cms.models.page import Page

class ModularPageTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        p = Page.objects.create()
        p.save()
        
    def test_home_page(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, 200)