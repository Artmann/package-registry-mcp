import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const mockServer = setupServer(
  http.get('https://pypi.org/pypi/requests/json', () => {
    return HttpResponse.json({
      info: {
        author: 'Kenneth Reitz',
        author_email: 'me@kennethreitz.org',
        bugtrack_url: null,
        classifiers: [
          'Development Status :: 5 - Production/Stable',
          'Environment :: Web Environment',
          'Intended Audience :: Developers',
          'License :: OSI Approved :: Apache Software License',
          'Natural Language :: English',
          'Programming Language :: Python',
          'Programming Language :: Python :: 3',
          'Programming Language :: Python :: 3.8',
          'Programming Language :: Python :: 3.9',
          'Programming Language :: Python :: 3.10',
          'Programming Language :: Python :: 3.11',
          'Programming Language :: Python :: 3.12'
        ],
        description:
          '# Requests\n\n**Requests** is a simple, yet elegant, HTTP library.\n\nRequests allows you to send HTTP/1.1 requests extremely easily.',
        description_content_type: 'text/markdown',
        docs_url: null,
        download_url: null,
        downloads: {
          last_day: 2500000,
          last_month: 75000000,
          last_week: 17500000
        },
        home_page: 'https://requests.readthedocs.io',
        keywords: null,
        license: 'Apache-2.0',
        maintainer: null,
        maintainer_email: null,
        name: 'requests',
        package_url: 'https://pypi.org/project/requests/',
        platform: null,
        project_url: 'https://pypi.org/project/requests/',
        project_urls: {
          Documentation: 'https://requests.readthedocs.io',
          Homepage: 'https://requests.readthedocs.io',
          Source: 'https://github.com/psf/requests'
        },
        release_url: 'https://pypi.org/project/requests/2.32.4/',
        requires_dist: [
          'charset_normalizer<4,>=2',
          'idna<4,>=2.5',
          'urllib3<3,>=1.21.1',
          'certifi>=2017.4.17'
        ],
        requires_python: '>=3.8',
        summary: 'Python HTTP for Humans.',
        version: '2.32.4',
        yanked: false,
        yanked_reason: null
      },
      last_serial: 29525769,
      releases: {
        '2.32.0': [
          {
            comment_text: '',
            digests: {
              blake2b_256:
                'f9d9ef7dc3a6b3f07e5d632048fee4329b4e65c6b5e1ba6e7d9c6a9f0e8a1234',
              md5: 'abc123def456',
              sha256: 'def456abc789'
            },
            downloads: 1000,
            filename: 'requests-2.32.0-py3-none-any.whl',
            has_sig: false,
            md5_digest: 'abc123def456',
            packagetype: 'bdist_wheel',
            python_version: 'py3',
            requires_python: '>=3.8',
            size: 64928,
            upload_time: '2024-05-20T15:00:00',
            upload_time_iso_8601: '2024-05-20T15:00:00.000000Z',
            url: 'https://files.pythonhosted.org/packages/f9/d9/ef7dc3a6b3f07e5d632048fee4329b4e65c6b5e1ba6e7d9c6a9f0e8a1234/requests-2.32.0-py3-none-any.whl',
            yanked: false,
            yanked_reason: null
          }
        ],
        '2.32.1': [
          {
            comment_text: '',
            digests: {
              blake2b_256:
                'a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890',
              md5: 'def456ghi789',
              sha256: 'ghi789jkl012'
            },
            downloads: 1500,
            filename: 'requests-2.32.1-py3-none-any.whl',
            has_sig: false,
            md5_digest: 'def456ghi789',
            packagetype: 'bdist_wheel',
            python_version: 'py3',
            requires_python: '>=3.8',
            size: 64950,
            upload_time: '2024-06-10T10:30:00',
            upload_time_iso_8601: '2024-06-10T10:30:00.000000Z',
            url: 'https://files.pythonhosted.org/packages/a1/b2/c3d4e5f6789012345678901234567890123456789012345678901234567890/requests-2.32.1-py3-none-any.whl',
            yanked: false,
            yanked_reason: null
          }
        ],
        '2.32.4': [
          {
            comment_text: '',
            digests: {
              blake2b_256:
                'b1c2d3e4f5a6789012345678901234567890123456789012345678901234567890',
              md5: 'ghi789jkl012',
              sha256: 'jkl012mno345'
            },
            downloads: 2000,
            filename: 'requests-2.32.4-py3-none-any.whl',
            has_sig: false,
            md5_digest: 'ghi789jkl012',
            packagetype: 'bdist_wheel',
            python_version: 'py3',
            requires_python: '>=3.8',
            size: 65000,
            upload_time: '2024-10-15T12:00:00',
            upload_time_iso_8601: '2024-10-15T12:00:00.000000Z',
            url: 'https://files.pythonhosted.org/packages/b1/c2/d3e4f5a6789012345678901234567890123456789012345678901234567890/requests-2.32.4-py3-none-any.whl',
            yanked: false,
            yanked_reason: null
          }
        ]
      },
      urls: [
        {
          comment_text: '',
          digests: {
            blake2b_256:
              'b1c2d3e4f5a6789012345678901234567890123456789012345678901234567890',
            md5: 'ghi789jkl012',
            sha256: 'jkl012mno345'
          },
          downloads: 2000,
          filename: 'requests-2.32.4-py3-none-any.whl',
          has_sig: false,
          md5_digest: 'ghi789jkl012',
          packagetype: 'bdist_wheel',
          python_version: 'py3',
          requires_python: '>=3.8',
          size: 65000,
          upload_time: '2024-10-15T12:00:00',
          upload_time_iso_8601: '2024-10-15T12:00:00.000000Z',
          url: 'https://files.pythonhosted.org/packages/b1/c2/d3e4f5a6789012345678901234567890123456789012345678901234567890/requests-2.32.4-py3-none-any.whl',
          yanked: false,
          yanked_reason: null
        }
      ],
      vulnerabilities: []
    })
  }),

  http.get('https://pypi.org/pypi/django/json', () => {
    return HttpResponse.json({
      info: {
        author: 'Django Software Foundation',
        author_email: 'foundation@djangoproject.com',
        bugtrack_url: null,
        classifiers: [
          'Development Status :: 5 - Production/Stable',
          'Environment :: Web Environment',
          'Framework :: Django',
          'Intended Audience :: Developers',
          'License :: OSI Approved :: BSD License',
          'Programming Language :: Python',
          'Programming Language :: Python :: 3',
          'Programming Language :: Python :: 3.10',
          'Programming Language :: Python :: 3.11',
          'Programming Language :: Python :: 3.12'
        ],
        description:
          'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.',
        description_content_type: 'text/plain',
        docs_url: null,
        download_url: null,
        downloads: {
          last_day: 180000,
          last_month: 5400000,
          last_week: 1260000
        },
        home_page: 'https://www.djangoproject.com/',
        keywords: null,
        license: 'BSD-3-Clause',
        maintainer: null,
        maintainer_email: null,
        name: 'Django',
        package_url: 'https://pypi.org/project/Django/',
        platform: null,
        project_url: 'https://pypi.org/project/Django/',
        project_urls: {
          Documentation: 'https://docs.djangoproject.com/',
          Funding: 'https://www.djangoproject.com/fundraising/',
          Homepage: 'https://www.djangoproject.com/',
          'Release notes': 'https://docs.djangoproject.com/en/stable/releases/',
          Source: 'https://github.com/django/django',
          Tracker: 'https://code.djangoproject.com/'
        },
        release_url: 'https://pypi.org/project/Django/5.1.4/',
        requires_dist: [
          'asgiref>=3.8.1,<4',
          'sqlparse>=0.3.1',
          'tzdata; sys_platform == "win32"'
        ],
        requires_python: '>=3.10',
        summary:
          'A high-level Python web framework that encourages rapid development and clean, pragmatic design.',
        version: '5.1.4',
        yanked: false,
        yanked_reason: null
      },
      last_serial: 30123456,
      releases: {
        '5.1.0': [],
        '5.1.1': [],
        '5.1.2': [],
        '5.1.3': [],
        '5.1.4': [
          {
            comment_text: '',
            digests: {
              blake2b_256:
                'c1d2e3f4a5b6789012345678901234567890123456789012345678901234567890',
              md5: 'mno345pqr678',
              sha256: 'pqr678stu901'
            },
            downloads: 5000,
            filename: 'Django-5.1.4-py3-none-any.whl',
            has_sig: false,
            md5_digest: 'mno345pqr678',
            packagetype: 'bdist_wheel',
            python_version: 'py3',
            requires_python: '>=3.10',
            size: 8200000,
            upload_time: '2024-12-01T14:00:00',
            upload_time_iso_8601: '2024-12-01T14:00:00.000000Z',
            url: 'https://files.pythonhosted.org/packages/c1/d2/e3f4a5b6789012345678901234567890123456789012345678901234567890/Django-5.1.4-py3-none-any.whl',
            yanked: false,
            yanked_reason: null
          }
        ]
      },
      urls: [
        {
          comment_text: '',
          digests: {
            blake2b_256:
              'c1d2e3f4a5b6789012345678901234567890123456789012345678901234567890',
            md5: 'mno345pqr678',
            sha256: 'pqr678stu901'
          },
          downloads: 5000,
          filename: 'Django-5.1.4-py3-none-any.whl',
          has_sig: false,
          md5_digest: 'mno345pqr678',
          packagetype: 'bdist_wheel',
          python_version: 'py3',
          requires_python: '>=3.10',
          size: 8200000,
          upload_time: '2024-12-01T14:00:00',
          upload_time_iso_8601: '2024-12-01T14:00:00.000000Z',
          url: 'https://files.pythonhosted.org/packages/c1/d2/e3f4a5b6789012345678901234567890123456789012345678901234567890/Django-5.1.4-py3-none-any.whl',
          yanked: false,
          yanked_reason: null
        }
      ],
      vulnerabilities: []
    })
  })
)
